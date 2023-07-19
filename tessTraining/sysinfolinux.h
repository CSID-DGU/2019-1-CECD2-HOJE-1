#ifndef SYSINFOLINUX_H
#define SYSINFOLINUX_H

#include <QVector>

class SysInfoLinux
{
public:
    SysInfoLinux();

    void init();
    double cpuLoadAverage();
    double memoryUsed();

private:
    QVector<qulonglong> cpuRawData();
    QVector<qulonglong> mCpuLoadLastValues;
};

#endif // SYSINFOLINUX_H
