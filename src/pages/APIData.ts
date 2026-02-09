export class APIData
{
    baseUrl: string;
    apiKey: string = import.meta.env.VITE_MLECTURE_API_KEY;
    isLocal: boolean = import.meta.env.VITE_LOCAL;

    constructor()
    {
        this.baseUrl = "https://mlecture.azurewebsites.net/api";
    }

    async getNotes(noteId: string, user: string) {
        var url: string;
        if(this.isLocal == true)
        {
            url = `${this.baseUrl}/notes/get-notes/${user}/${noteId}`;
        }
        else
        {
            url = `${this.baseUrl}/notes/get-notes/${user}/${noteId}?code=${this.apiKey}`;
        }
        const response = await fetch(
            url,
            { method: "GET" }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        var notesReady: boolean = false;
        if (data.Notes != null) {
            notesReady = true;
        }
        return { notes: data.Notes, ready: notesReady };
    }

    async createNotes(url: string, user: string) {
        if(this.isLocal == true)
        {
            url = `${this.baseUrl}/notes/create-notes/${user}`;
        }
        else
        {
            url = `${this.baseUrl}/notes/create-notes/${user}?code=${this.apiKey}`;
        }
        const response = await fetch(
            `${this.baseUrl}/notes/create-notes/${user}?code=${this.apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data.JobId;
    }
}