#ifndef TRAINWORKER_H
#define TRAINWORKER_H

#include <QObject>
#include <QString>
#include <QProcess>

class TrainWorker : public QObject
{
    Q_OBJECT
public:
    explicit TrainWorker(QObject *parent = nullptr);

    // 학습 함수
    void train_images();
    void train_singleImage();
    void train_fonts();
    void kor_eng();

signals:
    void process_start();
    void process_finish();
    void process_print(QString*);

public slots:
    void print_manager();

private:
    QProcess* process;

};

#endif // TRAINWORKER_H
