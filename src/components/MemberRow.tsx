import { schoolName, type Member } from '../content/members';

interface MemberRowProps {
  member: Member;
}

export function MemberRow({ member }: MemberRowProps) {
  return (
    <li className="member-row">
      <span className="member-name">
        {member.linkedInUrl ? (
          <a
            href={member.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
          >
            {member.name}
          </a>
        ) : (
          member.name
        )}
      </span>
      <span className="member-school">{schoolName(member.school)}</span>
      <span className="member-year">Class of {member.classYear}</span>
    </li>
  );
}
