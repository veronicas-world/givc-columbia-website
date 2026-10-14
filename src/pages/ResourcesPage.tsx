import { Link } from 'react-router-dom';
import { ExternalLink } from '../components/ExternalLink';
import { PageHeader } from '../components/PageHeader';
import { PastEventsArchive } from '../components/PastEventsArchive';
import { pastEventsAnchor } from '../content/events';
import { resourceGroups } from '../content/resources';

export function ResourcesPage() {
  return (
    <>
      <PageHeader title="Resources">
        <p>
          A short list of outside resources for learning about venture capital and finding related careers, followed by
          the chapter's past events. Each resource link goes to the original publisher.
        </p>
        <p>
          <Link to={{ pathname: '/resources', hash: `#${pastEventsAnchor}` }}>Jump to past events</Link>
        </p>
      </PageHeader>
      {resourceGroups.map((group) => (
        <section className="section" key={group.title} aria-labelledby={slug(group.title)}>
          <h2 id={slug(group.title)}>{group.title}</h2>
          <p>{group.description}</p>
          <ul className="resource-list">
            {group.resources.map((resource) => (
              <li key={resource.url}>
                <h3>
                  <ExternalLink href={resource.url}>{resource.title}</ExternalLink>
                </h3>
                <p className="resource-source">{resource.source}</p>
                <p>{resource.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <PastEventsArchive />
    </>
  );
}

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
