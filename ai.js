function possible_move(row, collumn, token, board)
{
         this.row = row;
         this.collumn = collumn = collumn;
         this.token = token;
         this.score = 0;
         this.human_will_win = false;
         this.next = new Array();
         this.board = [[null, null, null], [null, null, null], [null, null, null]];
         
         for(var row = 0; row < 3; row++)
         for(var collumn = 0; collumn < 3; collumn++)
         {
             this.board[row][collumn] = board[row][collumn];
         }
}

//Creates a displayable version of the tic-tac-toe board. Used for debugging.
function display_board(board)
{
         var display = '<div style="border-width:1px; border-color:#000; border-style:solid; display:inline-block; margin:5px;">';
         
         for(var row = 0; row < 3; row++)
         {
             for(var collumn = 0; collumn < 3; collumn++)
             {
                 display += '<input type="text" value="' + board[row][collumn] + '" />';
             }
             
             display += '<br />';
         }
         
         display += '</div>';
         
         return(display);
}

function possible_moves(token, level)
{
         var possible_moves = new Array();         

         for(var row = 0; row < 3; row++)
         for(var collumn = 0; collumn < 3; collumn++)
         {
             if(this.board[row][collumn] == this.blank_token)
             {
                var possible_moves_length = possible_moves.length;
                
                this.board[row][collumn] = token;
             
                possible_moves[possible_moves_length] = new possible_move(row, collumn, token, this.board);
                
                var winning_token = this.winner();
                
                if(winning_token == this.computer_player)
                {
                   possible_moves[possible_moves_length].score = 1;
                }
                
                if(winning_token == this.human_player)
                {
                   possible_moves[possible_moves_length].score = -1;
                }                 
                
                if(this.blank_token_count() > 0 && level < 4 && winning_token == this.blank_token)
                {                   
                   possible_moves[possible_moves_length].next = (token == this.human_player) ? this.possible_moves(this.computer_player, level + 1) : this.possible_moves(this.human_player, level + 1);
                }
                
                this.board[row][collumn] = this.blank_token;
             }                          
         }                    
         
         return(possible_moves);
}

//Adds up the scores so a good move can be picked.
function add_scores(moves)
{
         for(var index = 0; index < moves.length; index++)
         {
             add_scores(moves[index].next);
         
             if(moves[index].score == 0)
             {
                var score = 0;
                
                for(var next_index = 0; next_index < moves[index].next.length; next_index++)
                {                    
                    score +=  moves[index].next[next_index].score;
                    
                    if(moves[index].next[next_index].score == -1 && moves[index].next[next_index].next.length == 0)
                    {
                       moves[index].human_will_win = true;                   
                    }
                }
                
                moves[index].score = score;
             }
         }
}

function sort(moves)
         {
              var is_sorted = false;
              
              while(is_sorted == false)
              {
                    is_sorted = true;
                    
                    for(var index = 0; index < moves.length - 1; index++)
                    {                  
                        if(moves[index].score < moves[index + 1].score)
                        {
                           tmp_move = moves[index];
                           moves[index] = moves[index + 1];
                           moves[index + 1] = tmp_move;
                     
                           is_sorted = false;
                        }
                    }
              }
              
              //put the moves that leave the human player open to win, at the end.
              is_sorted = false;
                            
              while(is_sorted == false)
              {
                    is_sorted = true;
                    
                    for(var index = 0; index < moves.length - 1; index++)
                    {                  
                        if(moves[index].human_will_win == true && moves[index + 1].human_will_win == false)
                        {
                           tmp_move = moves[index];
                           moves[index] = moves[index + 1];
                           moves[index + 1] = tmp_move;
                     
                           is_sorted = false;
                        }
                    }
              }                            
              
              //put the computer's winning moves at the beginning.
              is_sorted = false;
                            
              while(is_sorted == false)
              {
                    is_sorted = true;
                    
                    for(var index = 0; index < moves.length - 1; index++)
                    {                  
                        if(moves[index].next.length > 0 && moves[index + 1].next.length == 0 && moves[index + 1].score > 0)
                        {
                           tmp_move = moves[index];
                           moves[index] = moves[index + 1];
                           moves[index + 1] = tmp_move;
                     
                           is_sorted = false;
                        }
                    }
              }
         }
         
function pick(moves)
{
         var move = new Object();
         var pick = 0;
         
         //Pick a winning move.
         for(var number_of_winning_moves = 0; 
             number_of_winning_moves < moves.length && 
             moves[number_of_winning_moves].score == 1 && moves[number_of_winning_moves].next.length == 0;
             number_of_winning_moves++);
             
         if(number_of_winning_moves < moves.length)
         {             
            var best_score = moves[number_of_winning_moves].score;
         
            for(var number_of_good_moves = number_of_winning_moves;
                number_of_good_moves < moves.length && 
                moves[number_of_good_moves].score == best_score;
                number_of_good_moves++);
             
            for(var number_of_non_give_away_moves = number_of_winning_moves;
                number_of_non_give_away_moves < moves.length && moves[number_of_non_give_away_moves].human_will_win != true;
                number_of_non_give_away_moves++);
             
            //If there are no winning moves, pick one with a good score.
            pick = number_of_winning_moves == 0 ? 
                   Math.floor(Math.random() * number_of_good_moves) : 
                   Math.floor(Math.random() * number_of_winning_moves);
         
            this.debug_pick = 'number of winning moves : ' + number_of_winning_moves + '<br />' +
                              'number of good moves : ' + number_of_good_moves + '<br />' + 
                              'number of non give away moves : ' + number_of_non_give_away_moves + '<br />' +
                              'pick : ' + pick;
         }
         else
         {
            //Handles the event where the computer only has winning moves to make.
            pick = Math.floor(Math.random() * number_of_winning_moves);
            
            this.debug_pick = 'pick : ' + pick;
         }
         
         move.row = moves[pick].row;
         move.collumn = moves[pick].collumn;
         
         return(move);
}
 
 //Creates the decision tree.
function debug_ai(moves, levels)
{
         debug_html = '';
         
         for(var index = 0; index < moves.length; index++)
         {
             debug_html += display_board(moves[index].board);
             debug_html += moves[index].score;
             
             if(moves[index].next.length > 0 && levels > 1)
             {
                debug_html += '<div class="choices">';
                debug_html += debug_ai(moves[index].next, levels - 1);
                debug_html += '</div>';
             }
         }                  
         
         return(debug_html);
}

//Displays the decision tree in a new browser window.
function debug_my_last_move(levels)
{
         var debug_window = window.open();
         debug_window.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">');
         debug_window.document.write('<html xmlns="http://www.w3.org/1999/xhtml">');
         debug_window.document.write('<head>');
         debug_window.document.write('<title>Tic Tac Toe Debug Screen</title>');
         debug_window.document.write('<style type="text/css">');
         debug_window.document.write('input {width:20px; height:20px; text-align:center;}');
         debug_window.document.write('.choices {display:table; border-width:1px; border-color:#000; border-style:solid; margin:5px; padding:5px;}');
         debug_window.document.write('.debug_pick {border-width:1px; border-style:none; margin:10px; padding:10px; font-weight:bold;}');
         debug_window.document.write('</style>');
         debug_window.document.write('</head>');
         debug_window.document.write('<body>');
         debug_window.document.write('<div class="debug_pick">' + this.debug_pick + '</div>');
         debug_window.document.write('<div class="choices">');
         debug_window.document.write(debug_ai(this.moves, levels));
         debug_window.document.write('</div>');
         debug_window.document.write('</body>');
         debug_window.document.write('</html>');
         debug_window.document.close();
}

function artificial_intelligence()
{
         this.possible_moves = possible_moves;
         this.debug_my_last_move = debug_my_last_move;
         this.pick = pick;
         
         this.moves = this.possible_moves(this.computer_player, 0);                          
         
         //goes through all the possible moves and marks them 
         //according to immediate and future results
         add_scores(this.moves);
         
         //sorts all the moves in order of quality:         
         sort(this.moves);
         
         //gets a dicision.
         move = this.pick(this.moves);                          
                          
         return(move);
}
