# birdhouse-js

[![npm version](https://badge.fury.io/js/@danieloaks%2Fcodingtest-birdhouse-js.svg)](https://badge.fury.io/js/@danieloaks%2Fcodingtest-birdhouse-js) ![Test status](https://github.com/DanielOaks/codingtest-birdhouse-js/actions/workflows/ci.yml/badge.svg)

This is a typescript wrapper around the Smart BirdHouse API.

## Usage

`npm i @danieloaks/codingtest-birdhouse-js`

```ts
import API from "@danieloaks/codingtest-birdhouse-js";

const api = new API({
  apiBase: "https://example.com",
});

async function run() {
  const page = 1;
  const entriesPerPage = 15;
  const res = await api.registration.getRegistrationPage(page, entriesPerPage);

  for (const item of res.items) {
    console.log(
      `${item.value}: ${item.birdhouse?.name || "No birdhouse registered"}`,
    );

    if (!item.birdhouse) {
      continue;
    }

    const occupancyPage = 1;
    const occupancyEntriesPerPage = 15;
    const occupancy = await api.occupancy.getOccupancy(
      item.birdhouse.ubidValue,
      occupancyPage,
      occupancyEntriesPerPage,
    );

    for (const state of occupancy.items) {
      console.log(
        `  ${state.createdAt.toLocaleDateString()} - birds: ${
          state.birds
        } - eggs: ${state.eggs}`,
      );
    }
  }
}

run();
```

```
c36ba382-959d-48ff-8b72-de092c88d55e: Tessa's Birdhouse
  11/1/2022 - birds: 0 - eggs: 2
  10/30/2022 - birds: 1 - eggs: 2
  10/29/2022 - birds: 1 - eggs: 3
  10/28/2022 - birds: 0 - eggs: 1
91aa01b8-4248-495a-8fc0-9323b4d74e1e: Daniel's Birdhouse
  11/1/2022 - birds: 1 - eggs: 2
  10/30/2022 - birds: 2 - eggs: 21
  10/29/2022 - birds: 4 - eggs: 42
  10/28/2022 - birds: 6 - eggs: 63
```
