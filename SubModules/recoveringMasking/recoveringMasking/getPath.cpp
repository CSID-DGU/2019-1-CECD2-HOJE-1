#include <stdio.h>
#include <windows.h>

int main(int argc, char** argv)
{
	char path[128];

	
	if (GetCurrentDirectory(128, path) > 0) {
		printf("workingDriectory: %s\n %s\n %s\n", path, argv[1], argv[2]);
	}

	return 0;
}