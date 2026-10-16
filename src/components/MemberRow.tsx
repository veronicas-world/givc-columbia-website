import { memberDisplayName, schoolName, type Member } from '../content/members';

interface MemberRowProps {
  member: Member;
}

export function MemberRow({ member }: MemberRowProps) {
  const name = memberDisplayName(member.name);
  return (
    <li className="member-row">
      <span className="member-name">
        {member.linkedInUrl ? (
          <a
            href={member.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn (opens in a new tab)`}
          >
            {name}
          </a>
        ) : (
          name
        )}
      </span>
      <span className="member-school">{schoolName(member.school)}</span>
      <span className="member-year">Class of {member.classYear}</span>
    </li>
  );
}
