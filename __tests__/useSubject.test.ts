import {renderHook, act} from '@testing-library/react-hooks';
import useSubject from '../src/state/subjects/store'; // Import your Zustand store

describe('useSubject', () => {
  it('should fetch top subjects and update the state', async () => {
    const {result, waitFor} = renderHook(() => useSubject());

    // Mock the getBooksBySubjects function
    const mockGetBooksBySubjects = jest.fn().mockResolvedValue([
      /* Mock your expected data here */
    ]);

    jest
      .spyOn(
        require('../src/services/api/endpoints/subjects'),
        'getBooksBySubjects',
      )
      .mockImplementation(mockGetBooksBySubjects);

    // Call the fetchTopSubjects function
    await act(async () => {
      result.current.fetchTopSubjects();
      await waitFor(() => expect(result.current.loading).toBe(false));
    });

    // Now you can assert the state after the API call
    expect(result.current.topSubjects.length).toBeGreaterThan(0);
    // Add more assertions as needed
  });

  it('should handle errors during fetch', async () => {
    const {result, waitFor} = renderHook(() => useSubject());

    // Mock the getBooksBySubjects function to throw an error
    jest
      .spyOn(
        require('../src/services/api/endpoints/subjects'),
        'getBooksBySubjects',
      )
      .mockRejectedValue(new Error('API Error'));

    // Call the fetchTopSubjects function
    await act(async () => {
      result.current.fetchTopSubjects();
      await waitFor(() => expect(result.current.loading).toBe(false));
    });

    // Assert that the state is updated correctly when an error occurs
    expect(result.current.topSubjects.length).toBe(3); // Assuming it doesn't change on error
    // Add more error-specific assertions as needed
  });
});
