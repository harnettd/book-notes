# Book Notes

## Installation

```bash
$ psql -U <user> -f sql/create-db.sql
```

```bash
$ psql -U <user> -d nonfiction_books -f sql/init-tables.sql
```

In a file `./secrets/secrets.js', export your postgresql username and password:

```js
export const user = "<username>";
export const password = "<password>";
```
