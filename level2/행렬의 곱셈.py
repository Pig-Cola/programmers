import numpy as np

a = np.matrix([[1, 2], [2, 3], [4,3]])
b = np.matrix([[2, 4], [5, 2]])

c = a * b
print(c.tolist())