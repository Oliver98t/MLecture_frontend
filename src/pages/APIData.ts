export class APIData
{
    baseUrl: string;

    constructor()
    {
        this.baseUrl = "http://localhost:8080/api";
    }

    async getNotes(noteId: string, user: string) {
        const response = await fetch(
            `${this.baseUrl}/notes/get-notes/${user}/${noteId}`,
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
        const response = await fetch(
            `${this.baseUrl}/notes/create-notes/${user}`,
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