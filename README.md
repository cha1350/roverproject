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

### File format

First line will always be a size of a maps represent in integer only. After that will be an instruction to move or rotate.

### Some rules

1. Rover always starts in position 0,0 with facing north.
2. F for moving forward 1 block. L for turning left. R for turing right.
3. After the turning it should stay on the same block. Just direction is move.
4. If rover reaching the edge it must maintain the direction and position.

Put instruction .txt file in `/storage`
In `/storage` folder already have demo file for testing

1. demo1.txt is wrong format data.
2. demo2.txt ready to test.

then fill in your file name in cli.

```shell
    You have a mission to discover mars with rover! 🚀 🚀 🚀
    Please put your move instruction in /storage path.
    Fill in your file name: ${Your_file_name}

    # Your output will look like this
    demo2.txt
    6   |   N:0,0
    F   |   N:0,1
    R   |   E:0,1
    F   |   E:1,1
    L   |   N:1,1
    F   |   N:1,2
    R   |   E:1,2
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
