using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.AspNetCore.Http;
using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;
using Common;

namespace Company.Function;

public class ProxyCalls
{
    private readonly ILogger<ProxyCalls> _logger;

    public ProxyCalls(ILogger<ProxyCalls> logger)
    {
        _logger = logger;
    }

    public class CreateNotesResponse
    {
        [HttpResult]
        public HttpResponseData? HttpResponse { get; set; }
    }

    [Function("GetNotes")]
    public async Task<HttpResponseData> GetNotes(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "notes/get-notes/{user}/{jobId}")]
        HttpRequestData req, string user, string jobId)
    {
        var response = req.CreateResponse(HttpStatusCode.OK);
        response.Headers.Add("Content-Type", "application/json; charset=utf-8");

        string json = JsonSerializer.Serialize(
            new
                {
                    User = user,
                    Notes = "test"
                });
        await response.WriteStringAsync($"{json}\n");
        return response;
    }

    [Function("StartCreateNotes")]
    public async Task<CreateNotesResponse> StartCreateNotes(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "notes/create-notes/{user}")]
        HttpRequestData req, string user)
    {
        using var reader = new StreamReader(req.Body);
        string requestBody = await reader.ReadToEndAsync();
        using var doc = JsonDocument.Parse(requestBody);
        var root = doc.RootElement;

        string queueData;
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

            var result = new StartCreateNotesQueueData(user, url, Guid.NewGuid().ToString());
            string json = JsonSerializer.Serialize(result);
            queueData = json;
            await response.WriteStringAsync($"{json}\n");
        }
        catch(Exception e)
        {
            response = req.CreateResponse(HttpStatusCode.BadRequest);

            queueData = QueueConsts.triggerFailMessage;
            _logger.LogInformation(e.Message);
        }

        return new CreateNotesResponse()
        {
            HttpResponse = response
        };
    }
}