const fs = require("fs");
const fileContents = `
    GOOGLE_MAPS_API_KEY=${process.env.GOOGLE_MAPS_API_KEY}
    ALGOLIA_APP_ID=${process.env.ALGOLIA_APP_ID}
    ALGOLIA_SEARCH_KEY=${process.env.ALGOLIA_SEARCH_KEY}
    JOBS_API_URL=${process.env.JOBS_API_URL}
    JOBS_API_KEY=${process.env.JOBS_API_KEY}
    ONESIGNAL_APP_ID=${process.env.ONESIGNAL_APP_ID}
    PORTAL_TO_WORK_URL=${process.env.PORTAL_TO_WORK_URL}
    GOOGLE_ANALYTICS_ID=${process.env.GOOGLE_ANALYTICS_ID}
`;

fs.writeFileSync("./.env", fileContents)