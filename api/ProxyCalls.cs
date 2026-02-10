using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Common;

namespace Company.Function;

public class ProxyCalls
{
    private readonly ILogger<ProxyCalls> _logger;
    private readonly string baseUrl = "https://mlecture.azurewebsites.net/api";
    private readonly string? apiKey = Environment.GetEnvironmentVariable("MLECTURE_API_KEY");

    public ProxyCalls(ILogger<ProxyCalls> logger)
    {
        _logger = logger;
    }

    public class CreateNotesResponse
    {
        [HttpResult]
        public HttpResponseData? HttpResponse { get; set; }
    }

    private async Task<string> CreateNotesAsync(string user, string youtubeUrl)
    {
        var url = $"{baseUrl}/notes/create-notes/{user}?code={apiKey}";

        using var http = new HttpClient();
        var payload = new { url = youtubeUrl };

        using var response = await http.PostAsJsonAsync(url, payload);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    private async Task<string> GetNotesAsync(string user, string jobId)
    {
        var url = $"{baseUrl}/notes/get-notes/{user}/{jobId}?code={apiKey}";

        using var http = new HttpClient();
        using var response = await http.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }

    [Function("GetNotes")]
    public async Task<HttpResponseData> GetNotes(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "notes/get-notes/{user}/{jobId}")]
        HttpRequestData req, string user, string jobId)
    {
        var response = req.CreateResponse(HttpStatusCode.OK);
        response.Headers.Add("Content-Type", "application/json; charset=utf-8");

        string result = await GetNotesAsync(user, jobId);
        await response.WriteStringAsync($"{result}\n");
        return response;
    }

    [Function("StartCreateNotes")]
    public async Task<HttpResponseData> StartCreateNotes(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "notes/create-notes/{user}")]
        HttpRequestData req, string user)
    {
        using var reader = new StreamReader(req.Body);
        string requestBody = await reader.ReadToEndAsync();
        using var doc = JsonDocument.Parse(requestBody);
        var root = doc.RootElement;
        string url = string.Empty;
        var response = req.CreateResponse(HttpStatusCode.OK);
        response.Headers.Add("Content-Type", "text/plain; charset=utf-8");

        try
        {
            if (root.TryGetProperty("url", out var urlProp) && urlProp.ValueKind == JsonValueKind.String && !string.IsNullOrEmpty(urlProp.GetString()))
            {
                url = urlProp.GetString()!;
            }
            else
            {
                throw new Exception("The 'url' property is missing or null.");
            }
            _logger.LogInformation($"{url}");
        }
        catch(Exception e)
        {
            response = req.CreateResponse(HttpStatusCode.BadRequest);
            _logger.LogInformation(e.Message);
        }
        string apiCall = await CreateNotesAsync(user, url);
        await response.WriteStringAsync($"{apiCall}\n");
        return response;
    }
}