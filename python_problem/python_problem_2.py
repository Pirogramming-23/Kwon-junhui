
##############  menu 1

class Student:
    def __init__(self, name, mid_score, final_score, grade):
        self.name = name  
        self.mid_score = mid_score  
        self.final_score = final_score  
        self.grade = grade
        
    def get_name(self):
        return self.name
    def get_mid_score(self):
        return self.mid_score
    def get_final_score(self):
        return self.final_score
    def get_grade(self):
        return self.grade 
    def calculate_grade(self):
        total = (self.mid_score + self.final_score)/2
        if total >= 90:
            return 'A'
        elif total >= 80:
            return 'B'
        elif total >= 70:
            return 'C'
        elif total >= 60:
            return 'D'
        else:
            return 'F'
    
student_list = []

def Menu1(addstudent) :
    student_list.append(addstudent) #추가

def Menu2() :
    if(len(student_list)<=0):
        print("No stuent data!")
        return
    
    for student in student_list:
        if not student.get_grade():
            student.grade = student.calculate_grade() 
            print("Grading to all students.")           

##############  menu 3
def Menu3():
    if not student_list:
        print("No student data!")
        return

    for student in student_list:
        if not student.get_grade(): 
            print("Some students have no grade yet. Please run grading first.")
            return

    print("-----------------------")
    print("name  mid  final  grade")
    print("-----------------------")
    for student in student_list:
        print(f"{student.get_name()}   {student.get_mid_score()}   {student.get_final_score()}     {student.get_grade()}")
    print("-----------------------")
    print("Exit Program!")

##############  menu 4
def Menu4(name):
    for i, student in enumerate(student_list):
        if student.get_name() == name:
            del student_list[i]
            print(f"{name} student information is deleted.")
            return
    

#학생 정보를 저장할 변수 초기화
print("*Menu*******************************")
print("1. Inserting students Info(name score1 score2)")
print("2. Grading")
print("3. Printing students Info")
print("4. Deleting students Info")
print("5. Exit program")
print("*************************************")
while True :
    choice = input("Choose menu 1, 2, 3, 4, 5 : ")
    if choice == "1":
        name = ""
        mid = 0
        final = 0

        try:
            user_input = input("Enter the name and mid-score final-score: ")

            parts = user_input.split()
            if len(parts) == 3:
                name = parts[0]
                mid = int(parts[1])   
                final = int(parts[2]) 
                if mid < 0 or final < 0:
                    print("양의 점수만 가능합니다.")
                    continue
                if any(s.get_name() == name for s in student_list):
                    print("중복된 이름은 불가능합니다.")
                    continue
                addstudent = Student(name, mid, final, '')
                Menu1(addstudent)
            else:
                print("입력 데이터는 이름, 중간점수, 기말점수 총 3개여야 합니다.")
                continue
        except ValueError:
            print("score please")
        except Exception as e:
            print(f"error : {e}")

    elif choice == "2" :
        #예외사항 처리(저장된 학생 정보의 유무)
        #예외사항이 아닌 경우 2번 함수 호출
        Menu2()

    elif choice == "3" :
        #예외사항 처리(저장된 학생 정보의 유무, 저장되어 있는 학생들의 학점이 모두 부여되어 있는지)
        #예외사항이 아닌 경우 3번 함수 호출
        Menu3()

    elif choice == "4":
        if not student_list:
            print("No student data!")
        else:
            name = input("Enter the name to delete: ").strip()
            if any(s.get_name() == name for s in student_list):
                Menu4(name)
            else:
                print("Not exist name!")
                
    elif choice == "5" :
        #프로그램 종료 메세지 출력
        #반복문 종료
        print("Exit Program!")
        break
    else :
        #"Wrong number. Choose again." 출력
        print("Choose again.")