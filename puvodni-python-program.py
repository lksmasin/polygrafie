def levy_rezy(sirka_formatu, sirka_tiskoviny, okraj_levy, spadavka):
    rezy = []
    pozice_rezu = sirka_formatu - okraj_levy
    
    while pozice_rezu >= sirka_tiskoviny:
        rezy.append(pozice_rezu)
        pozice_rezu -= sirka_tiskoviny
        if pozice_rezu >= sirka_tiskoviny:
            rezy.append(pozice_rezu)
        pozice_rezu -= spadavka

    return rezy

def horni_rezy(vyska_formatu, vyska_tiskoviny, okraj_horni, spadavka):
    rezy = []
    pozice_rezu = vyska_formatu - okraj_horni
    
    while pozice_rezu >= vyska_tiskoviny:
        rezy.append(pozice_rezu)
        pozice_rezu -= vyska_tiskoviny
        if pozice_rezu >= vyska_tiskoviny:
            rezy.append(pozice_rezu)
        pozice_rezu -= spadavka

    return rezy

def vypis_rezy(rezy):
    for i, rez in enumerate(rezy, start=1):
        print(f"{i}. Řez: {rez}")

# ZMĚNIT NA INPUT!!!!
sirka_formatu = 320
vyska_formatu = 450
sirka_tiskoviny = 89
vyska_tiskoviny = 51
okraj_levy = 23
okraj_horni = 8
spadavka = 4

# Výpočet a výpis zbitku řezů z levé strany
print("Řezy z levé strany:")
levy = levy_rezy(sirka_formatu, sirka_tiskoviny, okraj_levy, spadavka)
#horni = horni_rezy(vyska_formatu, vyska_tiskoviny, okraj_horni, spadavka)
vypis_rezy(levy)

# Výpočet a výpis zbylích řezů z horní strany
print("\nŘezy z horní strany:")
horni = horni_rezy(vyska_formatu, vyska_tiskoviny, okraj_horni, spadavka)
vypis_rezy(horni)
