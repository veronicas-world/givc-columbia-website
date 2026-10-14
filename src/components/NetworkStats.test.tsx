import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NetworkStats } from './NetworkStats';

describe('NetworkStats', () => {
  it.each([false, true])('shows the four clearly labeled parent figures, compact=%s', (compact) => {
    const { container } = render(<NetworkStats compact={compact} />);
    const list = screen.getByRole('list', { name: 'Parent-network traction' });
    expect(within(list).getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      '6 continents', '24 campus chapters', '75 countries', '10k members',
    ]);
    expect(screen.queryByText(/not Columbia chapter totals/)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Parent-site figures/ })).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(/150|8,000|60 countries/);
    expect(container.querySelector('.network-stats')).toHaveClass(compact ? 'network-stats-compact' : 'network-stats');
  });
});
