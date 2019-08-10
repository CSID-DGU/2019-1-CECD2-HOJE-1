#ifndef TRAINWORKER_H
#define TRAINWORKER_H

#include <QObject>
#include <QString>
#include <QProcess>
#include <QWidget>

class TrainWorker : public QObject
{
    Q_OBJECT
public:
    explicit TrainWorker(QObject *parent = nullptr);
    QWidget* widget;
    void manager_func(QString);

    QString homeLocation;
    QString print;
signals:
    void process_start();
    void process_finish();
    void process_print();

public slots:
    void manager_print();

private:
    QProcess* process;
    // 학습 함수
    void train_images();
    void train_singleImage();
    void train_fonts();
    void kor_eng();

};

#endif // TRAINWORKER_H
