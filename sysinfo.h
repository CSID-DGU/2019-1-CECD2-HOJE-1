#ifndef SYSINFO_H
#define SYSINFO_H

#include <QWidget>
#include <QTimer>

#include "sysinfolinux.h"

namespace Ui {
class SysInfo;
}

class SysInfo : public QWidget
{
    Q_OBJECT

public:
    explicit SysInfo(QWidget *parent = nullptr,
                     int startDelayMs = 500,
                     int updateSeriesDelayMs = 500);
     ~SysInfo();


protected slots:
    void cpu_update();
    void memory_update();

private:
    SysInfoLinux* sys_linux;
    QTimer mRefreshTimer;
    Ui::SysInfo *ui;
};

#endif // SYSINFO_H
