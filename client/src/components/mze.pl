use_module(library(heaps)).

%% sample maze 1
samplemaze([
    [f,e,e,e,e],
    [e,w,w,w,e],
    [e,w,s,w,e],
    [e,w,e,e,e],
    [e,e,e,e,e]]).
	
%% sample maze 2
samplemaze2([
    [e,e,e,e,e,e,e,e,e,e,e],
    [e,e,e,w,f,e,e,e,e,e,e],
    [e,e,e,w,w,w,w,w,e,e,e],
    [e,e,e,e,e,e,e,e,e,e,e],
    [e,e,e,e,e,e,e,s,e,e,e],
    [e,e,e,e,e,e,e,e,e,e,e]]).

maze_element(Maze, J, I, Value) :-
    length(Maze, RC),
    ReversedI is RC-I+1,
    nth1(ReversedI, Maze, Row),
    nth1(J, Row, Value).

row_count([], 0).
row_count([_|T], RC) :- row_count(T, R), RC is R+1.
col_count([], 0).
col_count([H|_],CC) :- row_count(H, CC).

cell_empty(Maze, J, I) :- maze_element(Maze, J, I, e).
cell_empty(Maze, J, I) :- maze_element(Maze, J, I, f).
cell_finish(Maze, J, I) :- maze_element(Maze, J, I, f).

moveup(Maze, J, I, J, I2) :- I2 is I+1, row_count(Maze, RC), I2 =< RC, cell_empty(Maze, J, I2).
moveright(Maze, J, I, J2, I) :- J2 is J+1, col_count(Maze, CC), J2 =< CC, cell_empty(Maze, J2, I).
moveleft(Maze, J, I, J2, I) :- J2 is J-1, J2 >= 1, cell_empty(Maze, J2, I).
movedown(Maze, J, I, J, I2) :- I2 is I-1, I2 >= 1, cell_empty(Maze, J, I2).

visit_col([], _, []).
visit_col([e|T], 1, [v|T]).
visit_col([H|T], J, [H|Visited]) :- J2 is J-1, visit_col(T, J2, Visited).

visit2([H|T], J, I, I, [VisitedRow|T]) :- visit_col(H, J, VisitedRow).
visit2([H|T], J, I, Row, [H|Visited]) :- I2 is I+1, visit2(T, J, I2, Row, Visited).
visit(Maze, J, I, Visited) :- row_count(Maze, RC), Row is RC-I+1, visit2(Maze, J, 1, Row, Visited).


%********************************* Depth First Search ******************************
dfs(Maze, J, I, [[J,I]]) :- cell_finish(Maze, J, I).
dfs(Maze, SJ, SI, [[SJ, SI]|Path]) :- moveup(Maze, SJ, SI, J, I), visit(Maze, J, I, Visited), dfs(Visited, J, I, Path), !.
dfs(Maze, SJ, SI, [[SJ, SI]|Path]) :- moveright(Maze, SJ, SI, J, I), visit(Maze, J, I, Visited), dfs(Visited, J, I, Path), !.
dfs(Maze, SJ, SI, [[SJ, SI]|Path]) :- movedown(Maze, SJ, SI, J, I), visit(Maze, J, I, Visited), dfs(Visited, J, I, Path), !.
dfs(Maze, SJ, SI, [[SJ, SI]|Path]) :- moveleft(Maze, SJ, SI, J, I), visit(Maze, J, I, Visited), dfs(Visited, J, I, Path), !.
%***********************************************************************************


%********************************* Iterative Depening ******************************
ids(Maze, J, I, Depth, MaxDepth, Path) :- Depth =< MaxDepth, dls(Maze, J, I, Depth, Path), !. % Stop the search if the solution is found
ids(Maze, J, I, Depth, MaxDepth, Path) :- NewDepth is Depth+1, ids(Maze, J, I, NewDepth, MaxDepth, Path). % Increase the depth and search again

dls(Maze, J, I, 0, [[J,I]]) :- cell_finish(Maze, J, I), !.
dls(Maze, SJ, SI, Depth, [[SJ, SI]|Path]) :- Depth > 0, moveup(Maze, SJ, SI, J, I), NewDepth is Depth-1, visit(Maze, J, I, Visited), dls(Visited, J, I, NewDepth, Path), !.
dls(Maze, SJ, SI, Depth, [[SJ, SI]|Path]) :- Depth > 0, moveright(Maze, SJ, SI, J, I), NewDepth is Depth-1, visit(Maze, J, I, Visited), dls(Visited, J, I, NewDepth, Path), !.
dls(Maze, SJ, SI, Depth, [[SJ, SI]|Path]) :- Depth > 0, movedown(Maze, SJ, SI, J, I), NewDepth is Depth-1, visit(Maze, J, I, Visited), dls(Visited, J, I, NewDepth, Path), !.
dls(Maze, SJ, SI, Depth, [[SJ, SI]|Path]) :- Depth > 0, moveleft(Maze, SJ, SI, J, I), NewDepth is Depth-1, visit(Maze, J, I, Visited), dls(Visited, J, I, NewDepth, Path), !.
%***********************************************************************************

%********************** A-Star with euclidean distance heuristic *******************
heuristic([X1,Y1], [X2,Y2], Distance) :- Distance is sqrt((X1-X2)**2 + (Y1-Y2)**2). 
 
generate_neighbors(Maze, [J,I], up, N) :- (moveup(Maze,J,I,J2,I2)-> generate_neighbors(Maze, [J,I], left, N2), N=[[J2,I2]|N2];generate_neighbors(Maze, [J,I], left, N)).
generate_neighbors(Maze, [J,I], left, N) :- (moveleft(Maze,J,I,J2,I2)-> generate_neighbors(Maze, [J,I], down, N2), N=[[J2,I2]|N2];generate_neighbors(Maze, [J,I], down, N)).
generate_neighbors(Maze, [J,I], down, N) :- (movedown(Maze,J,I,J2,I2)-> generate_neighbors(Maze, [J,I], right, N2), N=[[J2,I2]|N2];generate_neighbors(Maze, [J,I], right, N)).
generate_neighbors(Maze, [J,I], right, N) :- (moveright(Maze,J,I,J2,I2)-> N=[[J2,I2]];N=[]).
process_neighbors(_, Open, _, [], _, Open).
process_neighbors(Finish, Open, Closed, [N|T], G-Current-Process, Open1) :- 
    (
        member(N, Closed)-> Open2=Open; 
        heap_to_list(Open, OpenList), 
        (
            member(_-(GN-N-_), OpenList) -> 
            (
                G < GN -> 
                delete_from_heap(Open, _, _-N-_, Open3), 
                heuristic(N, Finish, H),
                F is H+G,
                add_to_heap(Open3, F, G-N-Process, Open2);
                Open2 = Open
            );
            heuristic(N, Finish, H),
            F is H+G,
            add_to_heap(Open, F, G-N-Process, Open2)
        )
    ),
    process_neighbors(Finish, Open2, Closed, T, G-Current-Process, Open1).

astar(Maze, Start, Finish, Path) :- 
    heuristic(Start, Finish, D),
    singleton_heap(OpenList, D, 0-Start-[]),
    astar2(Maze, Start, Finish, OpenList, [], Answer),
    reverse(Answer, Path).
astar2(Maze, Start, Finish, OpenList, Closed, Path) :- 
    not(empty_heap(OpenList)), 
    get_from_heap(OpenList, _, G-Current-Process, Remaining),
    ord_union([Current], Closed, Closed1), 
    (
        Current == Finish -> Path = [Current|Process]; 
        generate_neighbors(Maze, Current, up, N),
        G1 is G+1, 
        Process1 = [Current|Process], 
        process_neighbors(Finish, Remaining, Closed1, N, G1-Current-Process1, Open1), 
        astar2(Maze, Start, Finish, Open1, Closed1, Path), ! 
    ).
%***********************************************************************************