import { BoardCard } from '../components/BoardCard';
import { MemberRow } from '../components/MemberRow';
import { PageHeader } from '../components/PageHeader';
import { boardIsPending, boardMembers } from '../content/board';
import { memberClassGroups, members } from '../content/members';

export function PeoplePage() {
  return (
    <>
      <PageHeader title="People">
        <p>The students who lead and take part in Girls Into VC at Columbia.</p>
      </PageHeader>

      <section className="section" aria-labelledby="board-heading">
        <h2 id="board-heading">Board</h2>
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
      </section>

      <section className="section" aria-labelledby="members-heading">
        <h2 id="members-heading">Members</h2>
        <p>
          {members.length} members across Columbia College, Columbia Engineering and Barnard College.
        </p>
        {memberClassGroups.map((group) => (
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
      </section>
    </>
  );
}
