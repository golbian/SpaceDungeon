db.createUser(
        {
            user: "spacedungeon",
            pwd: "exemple",
            roles: [
                {
                    role: "readWrite",
                    db: "spacedungeon1"
                }
            ]
        }
);
