import csv
import json

teams = []
with open('I1.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
      if row[2] != "HomeTeam" and row[2] not in teams:
        teams.append(row[2])
      if row[3] != "AwayTeam" and row[3] not in teams:
        teams.append(row[3])

data = {}
for i in teams:
  data[i] = []

with open('I1.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
      if row[6] == "H":
        if row[3] not in data[row[2]]:
          data[row[2]].append(row[3])
      if row[6] == "A":
        if row[2] not in data[row[3]]:
          data[row[3]].append(row[2])


json_data = json.dumps(data)
print(json_data)
