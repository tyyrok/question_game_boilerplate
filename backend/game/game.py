import random
from copy import deepcopy
from game.utils import ImportQuestions

class JsonGameMessanger:
    """Class for making json formated responses returning to consumer"""
    def json_next_question(self, message):
        return {
            "type": "next_question",
            "message": message
        }
        
    def json_current_score(self, message):
        return {
            "type": "score",
            "message": message
        }
        
    def json_end_game(self, message, win=False):
        if win is True:
            return {
                "type": "win",
                "message": message
            }
        else:
            return {
                "type": "lost",
                "message": message
            }

class Game:
    """Main game logic is here
    """
    def __init__(self) -> None:
        self.score = 0
        self.current_question = {}
        self.questions = self.import_questions()
        random.shuffle(self.questions)
        self.question_r_generator = (x for x in self.questions)
        self.json_messenger = JsonGameMessanger()
    
    def import_questions(self) -> list[dict]:
        """Load questions from special func/class"""
        importer = ImportQuestions()
        return importer.import_csv()
    
    def get_next_question(self) -> dict:
        """Return next question to user
        """
        try:
            self.current_question = next(self.question_r_generator)
            print(self.current_question)
            question = deepcopy(self.current_question)
            question.pop("correct_answer")
            return self.json_messenger.json_next_question(question)

        except StopIteration:
            self.current_question = None
            return self.end_game(win=True)
    
    def get_user_result(self) -> dict:
        """Return current result of game"""
        return self.json_messenger.json_current_score(self.score)
    
    def check_answer(self, answer) -> dict:
        """"Check whether user answer is correct or not"""
        if self.current_question:
            #print(answer == self.current_question['correct_answer'])
            #print(answer)
            #print(self.current_question)
            #print(self.current_question['correct_answer'])
            if answer == self.current_question['correct_answer']:
                self.score += 1
                return self.get_next_question()
            else:
                return self.end_game()
        else:
            pass
    
    def end_game(self, win=False) -> dict:
        """Return message about user win with score"""
        return self.json_messenger.json_end_game(message=self.score, win=win)
    