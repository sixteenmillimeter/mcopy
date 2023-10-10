//g++ -o mphd mcopy_projector_homing_debug.cpp

#include <iostream>
#include <sstream>
#include <string>
#include <fstream>
using namespace std;

int main() {
    ifstream input("mcopy_projector_homing_debug.csv");
    for ( string line; getline( input, line ); )
    {
        cout << line << endl;
    }
    return 0;
}
