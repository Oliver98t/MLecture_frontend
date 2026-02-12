export class APIData
{
    baseUrl: string;
    apiKey: string = import.meta.env.VITE_MLECTURE_API_KEY;
    localBackend: string = import.meta.env.VITE_LOCAL_BACKEND;
    proxyBackend: string = import.meta.env.VITE_PROXY_BACKEND;

    constructor()
    {
        if(this.localBackend == "true")
        {
            if(this.proxyBackend == "false")
            {
                this.baseUrl = "http://localhost:8080/api";
            }
            else
            {
                this.baseUrl = "http://localhost:7071/api";
            }
        }
        else
        {
            this.baseUrl ="/api";
        }
        console.log(`proxyBackend backend: ${this.proxyBackend}`);
        console.log(`local: ${this.localBackend}`);
    }

    async loginUser(email: string, password: string) {
        const url = `${this.baseUrl}/user/login`;
        console.log(`login url: ${url}`);

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Email: email, Password: password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    }

    async getNotes(noteId: string, user: string) {
        var url: string;
        if(this.localBackend == "true")
        {
            url = `${this.baseUrl}/notes/get-notes/${user}/${noteId}`;
        }
        else
        {
            if(this.proxyBackend == "false")
            {
                url = `${this.baseUrl}/notes/get-notes/${user}/${noteId}?code=${this.apiKey}`;
            }
            else
            {
                url = `${this.baseUrl}/notes/get-notes/${user}/${noteId}`;
            }
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
            if(this.proxyBackend == "false")
            {
                url = `${this.baseUrl}/notes/create-notes/${user}?code=${this.apiKey}`;
            }
            else
            {
                url = `${this.baseUrl}/notes/create-notes/${user}`;
            }
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