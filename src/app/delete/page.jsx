"use client";
import { useState } from "react";
import axios from "axios";

export default function Delete() {
    const [commentId, setCommentId] = useState("");
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const buscarComentario = async () => {
        setLoading(true);
        setError(false);

        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/posts/${commentId}`
            );
            setComment(response.data);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const deletarComentario = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
            setSuccess(true);
            setComment(null);
            setCommentId("");
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Deletar Comentário</h1>

            <div>
                <input
                    type="number"
                    value={commentId}
                    onChange={(e) => setCommentId(e.target.value)}
                    placeholder="ID do comentário"
                />
                <button onClick={buscarComentario} disabled={!commentId || loading}>
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </div>

            {comment && (
                <div>
                    <h2>Comentário #{comment.id}</h2>
                    <p>
                        <strong>Nome:</strong> {comment.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {comment.email}
                    </p>
                    <p>
                        <strong>Comentário:</strong> {comment.body}
                    </p>
                    <button onClick={deletarComentario} disabled={loading}>
                        {loading ? "Deletando..." : "Deletar"}
                    </button>
                </div>
            )}

            {error && <p>❌ Erro na operação</p>}
            {success && <p>✅ Comentário deletado com sucesso!</p>}
        </div>
    );
}
