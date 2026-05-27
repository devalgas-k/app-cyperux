import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import HomePage from '@/home/infrastructure/primary/HomePage';

describe('Home tests', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<HomePage />);
    const title = getByText('React + TypeScript + Vite');
    expect(title).toBeTruthy();
  });
});

describe('Home I18next', () => {
  it('should render with translation', () => {
    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: vi.fn().mockImplementation(() => 'Internationalization enabled'),
        };
      },
    }));
    const { getAllByText } = render(<HomePage />);
    const title = getAllByText('Internationalization enabled');
    expect(title).toBeTruthy();
  });
});
