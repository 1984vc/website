import meta from "../../../pages/_meta.ts";
import founders_handbook_meta from "../../../pages/founders-handbook/_meta.ts";
export const pageMap = [{
  data: meta
}, {
  name: "cap-table-worksheet",
  route: "/cap-table-worksheet",
  frontMatter: {
    "sidebarTitle": "Cap Table Worksheet"
  }
}, {
  name: "founders-handbook",
  route: "/founders-handbook",
  children: [{
    data: founders_handbook_meta
  }, {
    name: "cap-table-101",
    route: "/founders-handbook/cap-table-101",
    frontMatter: {
      "title": "Cap Table 101",
      "notionId": "13f82923-1d09-806a-ba70-cc06d520f3b4",
      "createdAt": new Date(1731681420000),
      "lastEditedAt": new Date(1733941500000),
      "weight": 1
    }
  }, {
    name: "founder-departure",
    route: "/founders-handbook/founder-departure",
    frontMatter: {
      "title": "Founder Departure",
      "notionId": "1cc495a8-cf80-4e5d-87db-df793080ddbb",
      "createdAt": new Date(1722618360000),
      "lastEditedAt": new Date(1733941500000),
      "weight": 8
    }
  }, {
    name: "intro-to-safes",
    route: "/founders-handbook/intro-to-safes",
    frontMatter: {
      "title": "Introduction to SAFEs",
      "notionId": "13b82923-1d09-80ed-ae0a-db13d2f3f115",
      "createdAt": new Date(1731360360000),
      "lastEditedAt": new Date(1733941500000),
      "weight": 2
    }
  }, {
    name: "minimizing-founder-dillution",
    route: "/founders-handbook/minimizing-founder-dillution",
    frontMatter: {
      "title": "Minimizing Founder Dilution",
      "notionId": "cf6018ad-0896-4018-a501-407f4fdee039",
      "createdAt": new Date(1722643440000),
      "lastEditedAt": new Date(1733941500000),
      "weight": 7
    }
  }, {
    name: "pre-money-vs-post-money-conversion",
    route: "/founders-handbook/pre-money-vs-post-money-conversion",
    frontMatter: {
      "title": "Pre-money vs Post-money Conversion",
      "notionId": "23f1324e-5ecc-4d32-af0e-81e60a03cf18",
      "createdAt": new Date(1723341360000),
      "lastEditedAt": new Date(1733941500000),
      "weight": 3
    }
  }, {
    name: "raising-your-series-a",
    route: "/founders-handbook/raising-your-series-a",
    frontMatter: {
      "title": "Raising your Series A",
      "notionId": "306e9f6f-ab6b-4ebf-9bd1-c2520d4d12d1",
      "createdAt": new Date(1722636900000),
      "lastEditedAt": new Date(1733941500000),
      "weight": 6
    }
  }, {
    name: "safe-side-letters",
    route: "/founders-handbook/safe-side-letters",
    frontMatter: {
      "title": "SAFE Side Letters",
      "notionId": "67e9cba3-dc04-4a8c-9bb1-473fe8f7f93e",
      "createdAt": new Date(1722823380000),
      "lastEditedAt": new Date(1733941500000),
      "weight": 5
    }
  }, {
    name: "safe-vs-priced-round",
    route: "/founders-handbook/safe-vs-priced-round",
    frontMatter: {
      "title": "SAFE vs Priced Round",
      "notionId": "3c5a0edb-2574-4955-8cf9-68f5ded58812",
      "createdAt": new Date(1721832960000),
      "lastEditedAt": new Date(1733941500000),
      "weight": 4
    }
  }, {
    name: "selling-secondaries",
    route: "/founders-handbook/selling-secondaries",
    frontMatter: {
      "title": "Selling Secondaries",
      "notionId": "4c936519-bc35-480a-b4bc-39b1cc2df666",
      "createdAt": new Date(1731005580000),
      "lastEditedAt": new Date(1733941500000),
      "weight": 9
    }
  }, {
    name: "structured-and-downrounds",
    route: "/founders-handbook/structured-and-downrounds",
    frontMatter: {
      "title": "Structured and Down Rounds",
      "notionId": "c5fcc46c-3010-4040-9000-d483ebcdda04",
      "createdAt": new Date(1722641400000),
      "lastEditedAt": new Date(1733941500000),
      "weight": 10
    }
  }]
}, {
  name: "founders-handbook",
  route: "/founders-handbook",
  frontMatter: {
    "title": "Founders Handbook",
    "notionId": "15782923-1d09-800d-b121-c09f85a5d56c",
    "createdAt": new Date(1733783160000),
    "lastEditedAt": new Date(1733941500000),
    "weight": 1
  }
}];