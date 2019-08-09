#include "trainworker.h"

TrainWorker::TrainWorker(QObject *parent) : QObject(parent)
{
    process = new QProcess(this);
    // Process print
    connect(process, SIGNAL(readyReadStandardOutput()),this, SLOT(manager_func()));
    connect(process, SIGNAL(readyReadStandardError()),this, SLOT(manager_func()));

}
