import { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";
import DefaultLayout from "@/layouts/default";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";

async function getNotes(noteId: string) {
    const response = await fetch(
        `http://localhost:8080/api/notes/get-notes/oli98/${noteId}`,
        { method: "GET" }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    var notesReady : boolean = false;
    if(data.Notes != null)
    {
        notesReady = true;
    }
    return {notes: data.Notes, ready: notesReady};
}

async function createNotes(url: string) {
    const response = await fetch(
        "http://localhost:8080/api/notes/create-notes/oli98",
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

export default function MainPage() {
    const [url, setUrl] = useState(""); // 1. State for input
    const [jobId, setJobId] = useState<string | null>(null);
    const [notes, setNotes] = useState<string>("default");
    const [isGetNotesDone, setIsGetNotesDone] = useState<boolean>(false);

    useEffect(() => {
        const id = setInterval(async () => {
            if (jobId && !isGetNotesDone) {
                const notesData = await getNotes(jobId);
                setIsGetNotesDone(notesData.ready);
                if (notesData.notes != null) {
                    setNotes(String.raw`${notesData.notes}`);
                } else {
                    setNotes("default");
                }
            }
        }, 1000);

        return () => clearInterval(id);
    }, [jobId, isGetNotesDone]);

    const createNotesHandler = async () => {
        if (url.trim() !== "") {
            try {
                setIsGetNotesDone(false);
                const newJobId = await createNotes(url);
                setJobId(newJobId);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="w-full max-w-lg mx-auto flex gap-2 items-end justify-center">
                    <Input
                        label="YouTube URL"
                        type="url"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                    <Button
                        className={buttonStyles({
                            color: "primary",
                            radius: "full",
                            variant: "shadow",
                        })}
                        onPress={createNotesHandler}
                    >
                        Create
                    </Button>
                </div>
                <div className="w-full max-w-4xl mx-auto text-left justify-center">
                    <div className="prose max-w-4xl mx-auto">
                        <ReactMarkdown
                            rehypePlugins={[rehypeKatex]}
                            remarkPlugins={[remarkMath, remarkGfm]}
                        >
                            {notes}
                        </ReactMarkdown>
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
}