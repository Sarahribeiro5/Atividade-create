"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function GetbyIdPage() {
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState(null);
    const [error, setError] = useState(false);

    const params = useParams();
    const commentId = params?.id;

    const buscarComentario = async () => {
        if (!commentId) return;

        setLoading(true);
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            setComment(response.data);
        } catch (error) {
            setError(true);
            console.error("❌ Erro ao buscar comentário:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarComentario();
    }, [commentId]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao buscar comentário.</div>;
    if (!comment) return <div>Nenhum comentário encontrado.</div>;

    return (
        <div>
            <h1>Comentário #{comment.id}</h1>
            <hr />
            <p><strong>Email:</strong> {comment.email}</p>
            <p><strong>Comentário:</strong> {comment.body}</p>
        </div>
    );
}