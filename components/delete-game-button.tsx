"use client";

import { FormEvent } from "react";
import { deleteBattingStat } from "@/app/games/actions";

type DeleteGameButtonProps = {
  gameId: string;
};

export function DeleteGameButton({ gameId }: DeleteGameButtonProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const confirmed = window.confirm(
      "Delete this game? This cannot be undone.",
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <form action={deleteBattingStat} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={gameId} />
      <button
        type="submit"
        className="rounded border border-brand-accent px-4 py-2 text-sm font-medium text-brand-accent transition hover:bg-brand-accent hover:text-white"
      >
        Delete
      </button>
    </form>
  );
}
