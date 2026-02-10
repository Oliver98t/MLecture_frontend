export class APIData
{
    baseUrl: string;
    apiKey: string = import.meta.env.VITE_MLECTURE_API_KEY;
    localBackend: string = import.meta.env.VITE_LOCAL;

    constructor()
    {
        if(this.localBackend == "true")
        {
            this.baseUrl ="http://localhost:7071/api"
        }
        else
        {
            this.baseUrl ="/api";
        }
        console.log(`local: ${this.localBackend}`);
    }

    async getNotes(noteId: string, user: string) {
        var url: string;
        if(this.localBackend == "true")
        {
            url = `${this.baseUrl}/notes/get-notes/${user}/${noteId}`;
        }
        else
        {
            url = `${this.baseUrl}/notes/get-notes/${user}/${noteId}?code=${this.apiKey}`;
        }
        console.log(`get notes url: ${url}`);
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

    async createNotes(youtubeUrl: string, user: string) {
        var url: string;
        if(this.localBackend == "true")
        {
            url = `${this.baseUrl}/notes/create-notes/${user}`;
        }
        else
        {
            url = `${this.baseUrl}/notes/create-notes/${user}?code=${this.apiKey}`;
        }
        console.log(`create notes url: ${url}`);
        const response = await fetch(
            url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url : youtubeUrl }),
            });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data.JobId;
    }
}