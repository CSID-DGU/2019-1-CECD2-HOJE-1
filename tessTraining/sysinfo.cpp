#include "sysinfo.h"
#include "ui_sysinfo.h"

SysInfo::SysInfo(QWidget *parent,
                 int startDelayMs,
                 int updateSeriesDelayMs) :
    QWidget(parent),
    ui(new Ui::SysInfo)
{

    sys_linux = new SysInfoLinux();
    sys_linux->init();

    mRefreshTimer.setInterval(updateSeriesDelayMs);
    connect(&mRefreshTimer, &QTimer::timeout,
        this, &SysInfo::cpu_update);
    connect(&mRefreshTimer, &QTimer::timeout,
        this, &SysInfo::memory_update);
    mRefreshTimer.start(startDelayMs);

    ui->setupUi(this);
}


SysInfo::~SysInfo()
{
    delete ui;
    delete sys_linux;
}

void SysInfo::cpu_update()
{
    double cpuLoadAverage = sys_linux->cpuLoadAverage();
    ui->cpu_Bar->setValue(static_cast<int>(cpuLoadAverage));
}

void SysInfo::memory_update()
{
    double memoryUsed = sys_linux->memoryUsed();
    ui->memory_Bar->setValue(static_cast<int>(memoryUsed));
}
