db.createUser(
        {
            user: "db_username",
            pwd: "db_password",
            roles: [
                {
                    role: "readWrite",
                    db: "spacedungeon1"
                }
            ]
        }
);
