# roverproject

    This project development from story:
    "We are in a mission to control a rover that explore Mars planet. And the mission control already gave us a rover instructions to move into specific directions and positions."

# Getting Started

## First time run

Install the latest [Node.js LTS](https://nodejs.org/en/) then

```shell
    git clone https://github.com/cha1350/roverproject
    cd roverproject
    # For development
    npm install
    npm run dev
```

Put instruction .txt file in `/storage`
In `/storage` folder already have demo file for testing

1. demo1.txt is wrong format data.
2. demo2.txt ready to test.

then fill in your file name in cli.

```shell
    You have a mission to discover mars with rover! 🚀 🚀 🚀
    Please put your move instruction in /storage path.
    Fill in your file name: ${Your_file_name}
```

## Testing

```shell
    # Run test case using jest
    npm run test

    # Get test coverage report by
    npm run test:coverage

    # Lint debugging
    npm run lint

    # Format and fixing
    npm run lint:fix
```
