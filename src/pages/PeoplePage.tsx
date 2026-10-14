import { BoardCard } from '../components/BoardCard';
import { MemberRow } from '../components/MemberRow';
import { PageHeader } from '../components/PageHeader';
import { PageSection } from '../components/PageSection';
import { boardIsPending, boardMembers } from '../content/board';
import { memberClassGroups } from '../content/members';

const boardNames = new Set(boardMembers.filter((person) => !person.isExample).map((person) => person.name));
const generalMemberClassGroups = memberClassGroups
  .map((group) => ({ ...group, members: group.members.filter((member) => !boardNames.has(member.name)) }))
  .filter((group) => group.members.length > 0);

export function PeoplePage() {
  return (
    <>
      <PageHeader title="Executive Board" />

      <PageSection labelledBy="board-heading" className="board-section">
        <h2 id="board-heading" className="visually-hidden">Executive Board</h2>
        {boardIsPending ? (
          <p className="pending">
            The board list and portraits are not yet published. The cards below are examples that show how board
            members will appear.
          </p>
        ) : null}
        <ul className="board-grid">
          {boardMembers.map((person, index) => (
            <BoardCard key={`${person.name}-${index}`} person={person} />
          ))}
        </ul>
      </PageSection>

      <PageSection labelledBy="members-heading" tone="pale">
        <h2 id="members-heading">Members</h2>
        {generalMemberClassGroups.map((group) => (
          <section
            key={group.classYear}
            className="member-group"
            aria-labelledby={`members-${group.classYear}-heading`}
          >
            <h3 id={`members-${group.classYear}-heading`}>Class of {group.classYear}</h3>
            <ul className="member-list">
              {group.members.map((member) => (
                <MemberRow key={member.name} member={member} />
              ))}
            </ul>
          </section>
        ))}
      </PageSection>
    </>
  );
}
