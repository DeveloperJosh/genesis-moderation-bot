# Genesis Moderation Bot

## Development Scripts

Install Typescript globally:

```shell
npm i typescript -g
```

Restart the terminal.

Install dependencies:

```shell
npm i
```

Create .env file in project root:

```shell
touch .env
```

Define TOKEN in env

```env
TOKEN='TOKEN_GOES_HERE'
```

| Script            | Description                               |
| ----------------- | ----------------------------------------- |
| `npm start`       | Start the bot                             |
| `npm run tsc`     | Run the typescript compiler in watch mode |
| `npm run compile` | Compiles the bot                          |

## Discord Commands

| Command                      | Description             |
| ---------------------------- | ----------------------- |
| `help`                       | Shows the help menu     |
| `delad <MessageID> <Reason>` | Delete an advertisement |

## Notes

- Avoid using `:any` type.
- Stick to the established code model
- Prettier config file is included

### Design choices when coding

- Use a tabwidth of 2
- Avoid semicolons when possible
- Use single quotes over double quotes when possible
- Always include a trailing comma
