#Тестовое задание №2 в ШРИ Яндекса 2015
Демо http://buzzinoffbond.github.io/shri-api/

####Проблема
Внутрь коллбэк функции попадает не копия переменной i, а её итоговое значение, то есть каждый раз i будет равна 3. Отсюда, request всегда равна '/countries',
а длина l всегда равна единице. 

####Решение
Создать в цикле замыкание, чтобы в коллбэк каждый раз попадала нужная i.

##Доработанный скрипт
Нужно учесть, что существуют страны и города с одинаковыми названиями, хоть в данной версии они и не представлены.