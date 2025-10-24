export default {
    extends: ["@commitlint/config-conventional"],
    plugins: [
        {
            rules: {
                // Jira ticket rule
                "scope-valid-jira": ({ scope }) => {
                    const jiraTicket = process.env.JIRA_TICKET || null;

                    if (!jiraTicket || "" == jiraTicket) {
                        return [
                            false,
                            "Jira Ticket not found in you Git Branch name (e.g. feat(IMS-123): message)",
                        ];
                    }

                    if (!scope) {
                        return [
                            false,
                            "Scope is required (e.g. feat(IMS-123): message)",
                        ];
                    }

                    const jiraPattern = /^[A-Z]{2,10}-\d+$/;
                    const valid = jiraPattern.test(scope);

                    return [
                        valid,
                        "Scope must be a valid JIRA ticket (e.g. IMS-123, ABC-4567)",
                    ];
                },
            },
        },
    ],
    rules: {
        "type-empty": [2, "never"],
        "type-case": [2, "always", "lower-case"],
        "type-enum": [
            2,
            "always",
            [
                "feat",
                "fix",
                "chore",
                "refactor",
                "docs",
                "style",
                "test",
                "perf",
                "build",
                "ci",
                "revert",
                "hotfix",
                "bugfix",
            ],
        ],
        "scope-empty": [2, "never"],
        "scope-case": [2, "always", "upper-case"],
        "scope-valid-jira": [2, "always"],
        "subject-empty": [2, "never"],
        "header-max-length": [1, "always", 120],
    },
};
