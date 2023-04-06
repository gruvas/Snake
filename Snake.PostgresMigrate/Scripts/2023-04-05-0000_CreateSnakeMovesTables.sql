
--Start и End обозначают начало змеи, откуда пользователь может ходить
CREATE TABLE IF NOT EXISTS public."snake_game" (
    "Id" serial4 NOT NULL PRIMARY KEY,
    "Start" INTEGER NULL,
    "End" INTEGER NULL,
    "GameOver" BOOLEAN DEFAULT false,
    "Winner" INTEGER NULL
);


--"FirstField" поле которое пользователь выбрал для начала хода
--"LastField" поле которое пользователь выбрал для окончания хода
CREATE TABLE IF NOT EXISTS public.moves (
    "Id" SERIAL4 NOT NULL PRIMARY KEY,
    "SnakeGameId" INTEGER NOT NULL REFERENCES public.snake_game("Id") ON DELETE CASCADE,
    "PlayerNumber" INTEGER NOT NULL,
    "FirstField" INTEGER NOT NULL,
    "LastField" INTEGER NOT NULL,
    "MoveNumber" INTEGER NOT NULL
);