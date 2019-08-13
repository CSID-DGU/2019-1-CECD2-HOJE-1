#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QTextEdit>
#include <QMessageBox>

#include "httprequestworker.h"
#include "trainworker.h"
#include "sysinfo.h"

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private:
    Ui::MainWindow *ui;
    TrainWorker *trainworker;
    QTextEdit *edit;
    QMessageBox* waitMessage;
    QMessageBox* finishMessage;
    SysInfo* sysinfo;

private slots:

    void what_train(TrainWorker*, QString);

    void start_message();
    void finish_message();
    void print_message();

    void trasmit_traineddata();
    void check_version();
    void handle_result(HttpRequestWorker *worker);

};

#endif // MAINWINDOW_H
