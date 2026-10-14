import { networkStats } from '../content/network';

interface NetworkStatsProps {
  compact?: boolean;
}

/** Parent-network traction, always labeled separately from the Columbia chapter. */
export function NetworkStats({ compact = false }: NetworkStatsProps) {
  return (
    <div className={compact ? 'network-stats network-stats-compact' : 'network-stats'} data-network-stats>
      <p className="network-stats-label">Girls Into VC global network</p>
      <ul className="network-stat-list" aria-label="Parent-network traction">
        {networkStats.map((stat) => (
          <li key={stat.label}>
            <span className="network-stat-value">{stat.value}</span>{' '}
            <span className="network-stat-label">{stat.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
