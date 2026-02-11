import { APIData } from "./APIData";
import { useState, useEffect } from "react";
import { CircularProgress } from "@heroui/progress";
import { motion } from "framer-motion";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { button as buttonStyles } from "@heroui/theme";
import DefaultLayout from "@/layouts/default";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";

async function getAuthInfo() {
    try {
        const response = await fetch('http://localhost:4280/.auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies for authentication
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching auth data:', error);
        throw error;
    }
}

export default function MainPage() {
    const [url, setUrl] = useState(""); // 1. State for input
    const [jobId, setJobId] = useState<string | null>(null);
    const [notes, setNotes] = useState<string>("");
    const [isGetNotesDone, setIsGetNotesDone] = useState<boolean>(false);
    var apiData = new APIData();

    useEffect(() => {
        getAuthInfo();
        const id = setInterval(async () => {
            if (jobId && !isGetNotesDone) {
                const notesData = await apiData.getNotes(jobId, "oli98");
                setIsGetNotesDone(notesData.ready);
                if (notesData.notes != null) {
                    setNotes(String.raw`${notesData.notes}`.replace(/\u202F/g, " "));
                }
                else {
                    console.log(notesData);
                }
            }
        }, 1000);

        return () => clearInterval(id);
    }, [jobId, isGetNotesDone]);

    const createNotesHandler = async () => {
        if (url.trim() !== "") {
            try {
                setIsGetNotesDone(false);
                const newJobId = await apiData.createNotes(url, "oli98");
                setJobId(newJobId);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <DefaultLayout showLogout={true}>
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
                        {jobId && !isGetNotesDone ? (
                            <div className="flex justify-center items-center py-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    <CircularProgress size="lg"
                                        label="Creating your notes..."
                                    />
                                </motion.div>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 2 }}
                            >
                                <ReactMarkdown
                                    rehypePlugins={[rehypeKatex]}
                                    remarkPlugins={[remarkMath, remarkGfm]}
                                >
                                    {notes}
                                </ReactMarkdown>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
}