import { fetcher } from "../SWRConfigProvider";

describe("SWRConfigProvider", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("fetcher", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await fetcher({ s: "movie title to find" });

    expect(fetchMock.mock.calls[0]).toContain(
      "http://www.omdbapi.com/?s=movie+title+to+find"
    );
  });
});
