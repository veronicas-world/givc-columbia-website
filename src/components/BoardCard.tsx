import type { BoardMember } from '../content/board';

interface BoardCardProps {
  person: BoardMember;
}

export function BoardCard({ person }: BoardCardProps) {
  return (
    <li className="board-card" data-example={person.isExample ? 'true' : undefined}>
      {person.portrait ? (
        <img className="board-portrait" src={person.portrait.src} alt={person.portrait.alt} />
      ) : (
        <div className="board-portrait board-portrait-placeholder">
          <span>Portrait pending</span>
        </div>
      )}
      <div className="board-card-body">
        {person.isExample ? <p className="board-example-label">Example</p> : null}
        <h3>{person.name}</h3>
        {person.role ? <p className="board-role">{person.role}</p> : null}
        <p className="board-detail">{person.school}</p>
        <p className="board-detail">{person.classYear}</p>
        {person.linkedInUrl && !person.isExample ? (
          <a
            className="board-linkedin"
            href={person.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${person.name} on LinkedIn (opens in a new tab)`}
          >
            <LinkedInIcon />
          </a>
        ) : null}
      </div>
    </li>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
      />
    </svg>
  );
}
