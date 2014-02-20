function tic_tac_toe(blank_token, player_tokens, artificial_intelligence)
{         
         this.board = [[blank_token, blank_token, blank_token],
                       [blank_token, blank_token, blank_token],
                       [blank_token, blank_token, blank_token]];
                  
         this.blank_token = blank_token;
         this.player_tokens = player_tokens;         
         this.display_choice = function() {};
         this.declare_human_win = function() {};
         this.declare_computer_win = function() {};
         this.declare_tie = function() {};         
         this.artificial_intelligence = artificial_intelligence; 
                  
         this.start = 
         function() 
         {                  
                  //Randomly choose a token for the human player.
                  var human_token_index = Math.floor(Math.random() * this.player_tokens.length);
                  this.human_player = this.player_tokens[human_token_index];
                  
                  //Place the chosen token at the end of the array.
                  this.player_tokens[human_token_index] = this.player_tokens[this.player_tokens.length - 1];
                  this.player_tokens[this.player_tokens.length - 1] = this.human_player;
                  
                  //Randomly choose a different token for the computer player.
                  var computer_token_index = Math.floor(Math.random() * (this.player_tokens.length - 1));
                  this.computer_player = this.player_tokens[computer_token_index];                                    
                           
                  //Clear the board.
                  for(var row = 0; row < 3; row++)
                  for(var collumn = 0; collumn < 3; collumn++)
                  {
                      this.place(this.blank_token, row, collumn);
                  }   
                  
                  if(Math.random() < 0.5)
                  {                    
                     this.turn = this.computer_player;
                     this.computer_turn();
                  }
                  else
                  {
                     this.turn = this.human_player;
                  }                           
         };
         
         //Returns the token of the winning player. 
         //If no one has won yet or the game is tied, returns the blank token.
         //Used in combination with blank_token_count() to determine if the game is tied.
         this.winner =
         function()
         {
                  var winner = this.blank_token;
                                    
                  //Check for 3 consecutive horisontal tokens.
                  for(var row = 0; row < 3; row++)
                  {
                      winner = this.board[row][0];
                      for(var collumn = 1; collumn < 3; collumn++)
                      {
                          if(this.board[row][collumn] != winner)
                          {
                             winner = this.blank_token;
                          }                        
                      }
  
                      if(winner != this.blank_token)
                      {
                         return(winner);
                      }                      
                  }
                  
                  //Check for 3 consecutive vertical tokens.
                  for(var collumn = 0; collumn < 3; collumn++)
                  {
                      winner = this.board[0][collumn];
                      for(var row = 1; row < 3; row++)
                      {
                          if(this.board[row][collumn] != winner)
                          {
                             winner = this.blank_token;
                          }                               
                      }
                      
                      if(winner != this.blank_token)
                      {
                         return(winner);
                      }                                            
                  }
                  
                 //Check for 3 consecutive diagonal tokens.
                 winner = this.board[0][0];
                 for(var row = 1; row < 3; row++)
                 {
                     if(this.board[row][row] != winner)
                     {
                        winner = this.blank_token;
                     }
                 }
                 
                 if(winner != this.blank_token)
         {
            return(winner);
                 }
                 
                 winner = this.board[0][2];
                 for(var row = 1; row < 3; row++)
                 {
                     if(this.board[row][2 - row] != winner)
                     {
                        winner = this.blank_token;
                     }
                 }
                 
                 if(winner != this.blank_token)
         {
            return(winner);
                 }
                 
                 return(winner);
         };                
                  
         this.blank_token_count =
         function()
         {
                  var blank_token_count = 0;
         
                  for(var row = 0; row < 3; row++)
                  for(var collumn = 0; collumn < 3; collumn++)
                  {
                      if(this.board[row][collumn] == this.blank_token)
                      {
                         blank_token_count++;
                      }
                  }
                  
                  return(blank_token_count);
         };
         
         this.computer_turn =
         function()
         {  
                 //Lets the computer take its turn if the game is not over.
                 if(this.turn != this.blank_token)
                 {
                    this.turn = this.computer_player;
                    var computer_move = this.artificial_intelligence();
                    this.place(this.computer_player, computer_move.row, computer_move.collumn);                                  
                 }
         };
         
         this.human_turn = 
         function(row, collumn)
         {
                 this.place(this.human_player, row, collumn);
                 this.computer_turn();
         }
         
         this.place =
         function(token, row, collumn)
         {
                  if(row < 3 && collumn < 3 && 
                    ((this.turn == token && this.board[row][collumn] == this.blank_token) || token == this.blank_token))
                  {                     
                     this.board[row][collumn] = token;
                     this.display_choice(token, row, collumn)
                     
                     //Finishes the game in case a of a win or a tie.
                     //When the board is not being reset.
                     if(token != this.blank_token)
                     {
                        var winner_token = this.winner(); 
                     
                        if(winner_token == this.human_player)
                        {
                           this.declare_human_win();
                           this.turn = this.blank_token;
                        }
                     
                        if(winner_token == this.computer_player)
                        {
                           this.declare_computer_win();
                           this.turn = this.blank_token;
                        }
                     
                        if(winner_token == this.blank_token && this.blank_token_count() == 0)
                        {
                           this.declare_tie();
                           this.turn = this.blank_token;
                        }
                        
                        //Gives the human player a turn, if the game is not over.
                        if(this.turn == this.computer_player)
                        {
                           this.turn = this.human_player
                        }
                     }
                  }
         };
}
