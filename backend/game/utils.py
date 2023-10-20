class ImportQuestions:
    """Class for importing data"""
    def __init__(self) -> None:
        self.__arr = []
    
    def import_csv(self, filename='game/questions.csv', delimeter=',') -> list[dict]:
        """Import from CSV, default delimeter is ','"""
        self.__arr = []
        with open(filename, 'r') as f:
            for line in f:
                elem = {}
                line_split = line.split(delimeter)
                if 'LastCorrectAnswer\n' in line_split:
                    continue
                
                elem['question'], answers, elem['correct_answer'] = line_split[0], \
                                        line_split[1:-1], line_split[int(line_split[-1])]
                elem[f'answers'] = answers
                self.__arr.append(elem)
        return self.__arr