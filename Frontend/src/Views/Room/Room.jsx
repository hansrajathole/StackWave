import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
const Room = () => {
  const [language, setLanguage] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
 

  let icons = {
    javascript:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACKElEQVR4nO2WT0hVQRTGz/GZ7yEiRJJ/SsMiRaigUFwUhQgGouLChZS5Cmmj5c4kol1tRNoYLcJ0JRKUFYmUJi5EQSP/dEFxkUW4iQyUIMS+mHe5jtN7ihLeO8L54OPBmXmX+c2c+90hEolEIisFh2CTSQAcOQFIC+1GQbcM5CV2gt91SIw6we885EPm2GHarYJeMATACX7XIS3k/M+O8YZ7282xmT5CbTkjI42RGGJkHWbUVTJmX+4DgMFOQiSsx2iTkyMcHbcWYH2WkHtU18NJjILj7q9XKz7D+PPJUoCPz3U9IYEx/cKtLw4STmQzbl5jrExYfALDXbqu2uj3lJ7/64NlKRQP4MuQWa8uZXx+t9PnWQCgfPmC+eJGwozrNYz5/n0C8G2YcLYgNoFCIRdkddJyAGW1yNYGRkpyLMjpPMaPMcsBPH8fJdxvJqQfMiEar3KwACrvtwP4N+d/jlM0/7352Rk+AqgUqSphvH6kawsDJsCrDj3W/YBQeCo279tb9H+SDvgE0NNG0c+/lya36hkddwnnz5ktoe4+ar66/3i1kmLG1yG3vjxOuFSkx9TX2heAuTcaYCufPKavBg9bzZNhZhxJN68SyrcbfGyh908JqSnxF69a4e0Ts/fv3Nge+GJh/CjdMwDlpRFCUx0jJ9PNc3VNriljTD6LP3+sh3ClgpGf6+7+wVR34Y/vEdZmtkq1PQTwwyQAjpwAfG0hkUgkIj/0FxH0JVVHu8XgAAAAAElFTkSuQmCC",
    java: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFlElEQVR4nO1Xa2xURRQeQERUrG1ntoD4woIS8bmdu+UR6967xQooYCxBpSq7Zy4v8REV/0iqxkR8JMZfYkKMiUZC/eEzJEi6Z5YCf6j4iATUKA9jCA+x3XtLA0HWnNlH19Jaomy7Nf2SyXbPvZ39zsx3vjPD2BCGMIR+QadTNZENZniOfGhQJ+E51tpkRC5ngxFts6rLfFse9hz5AhtsSDWy4Z5jbfIdK9VhW0vZYEKqvn6E58j1RN6z5ekTkeBVbLAgVVNzke9YTUTeJODId9mg0rxjJfLI70/WBDk9S9VVjvLDodm+bb3l29ZGzw7dzIoJ7Y6c7Dvypxx52+rww9YtR6dPH+M78nnfsY6mn8kNbTNnlrJiQkc4FPRt+Xse+ZO+I+u82qqpvmPtzdaCZ1srWbGhsyZ0jedYh7rIy9MdtlxA8eyq0250ONY8VozwHLk5S55G0qlaQXGSSi6piFzIihFe7bSA51hn8op2HcVTweBIz5GdGc3vZsWK9khoUn7RZouzw66+Im9X9rLi7rby10wCO3PxuspRxoWysrozOIMVK3xHrjFEbastVV09Oi/+ZtcuyGZW1J3XtvYYohGpuh/kchILyxtZsSI5K3iD78jjpHeSVTbuReSDuV0IW8+wYsYJR05LNzM5NxujZHzbOpJJIsqKHclIaIrvyC/JRrMx37aOkZSOR4IlA8uOMcYhHhRKr+aA7wnATVzh2kBM11au2jQq+05HjTXBd6puM3+HQ/d6jtxHR43uc5UrLQXoJqHwBwEY527ijoIRL3kELxeACaF0Kj3wTF8/aIo7bDUcq7MuM4Sj28YLF2cKhQ1lgBMqFm++xMQUrqc5OeCJUrelMPeGAGB1F/lcEkmu8FsOegsN2hFaUa70J+a70q0C9B6h8CBXujP7P8LV9d1SHSaU3pt5/lhBEjBJKIwIwE856KNnJ9PbwCQH/E4o3MhBN5ZHm6/vaW7RtburWX+Atp5HcZGIYoMAvJ9WVcT0fZRkWSxhlcX0FLECLz2XuUqWt5RypX0jIzc+p+DkJzy1YzTJJLPCDSSBf3p//Mot5QEX5/embw76dTMX6D2sES8oGPHcD7rxOX+TCeABAfoLofAdrvTbNITCDzK1sU8A/pkuUu1xVz/OGlO5RscB5wqlT3PAw4HY1n66YjamhnNARQVMbnSOtXBQAK4TbmIWc1tNjwhAfF5aOriRXIkNBDhsmRyI4eIA4DIB+jkO+hUaAvBZDolYwI0741w0l/p8iBhWCsBVY6PNV7OBAlc6SivIQX8sVuDYriepYUQ64OqbBOiHhdIfUuO7LLajbMDIsvqmERVRnMrdxO0Vy7YHKCQAj+fLxMjBxHqWFQd9iByqX3mXLG8pNZ0ySzb9+TkdH7jCRaZI+9A/FagAvUFA/K6eHGvskq2CK/1aX272r8CV/rrLbbSm9n/WO0v1pADoBdk6IG0b/cd0rXCbr+uLGAe9kOavcOOh856AcY8uCewjCZ2vuSuWbQ8I0C8JwFO0SwWpEVoVrvBIN9//SgC+wQEfELH4DNOgMtbYI+q/v5C7iXHk86Zrp0knhMKTGYvdRfWVn9h5TaI8um1MxiK/6VXr1KyoPtLjAFf4Mw0B2N7L++3k/+UxfU9+YyPbpS7PCgVqOKR3AfgiV/p9rvQ2qhNDGPShPGf6gyv8hVZXKGw2p1TAV8l6TcetbxqRP68AvJUr/ZEA3Ub3hIIlQKtV+mjiSpLFf52qAhLXcsAnyRzS1ou7+uc44baO5ErfzZV+gm5kdEzmLgKdkcpdrDKutKRlIg3quKaOYno2HfwE4MsC8DOu9P6MlE4ZW3Zxfr6U+hGpYYasi/O5i2vMFRH0TgH4o1D4G0kp7TJGXrs56BajfVc/TbezcW7rxQNAeghD+F/gL76ssK8TFCCXAAAAAElFTkSuQmCC",
    cpp : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFEUlEQVR4nO2ZXUxbZRjHn46oUQE/ksULvWBBr7xw48K4TJ1LjNmFF462zs0BMc6puC8+CgiFUhhkyeaFZm5hOYdtgA6aCWgYLkP6AaUU+R6Er8BAhgutbPJVoKX0Me+BUCk9H6Wn0Av+yZOcnNP3nN//Pc/zvG9zALa1rSDU6caXQFFngJz2JVB3OEGhr4VT1Tsh6CXHEEjSXQJ1uxPyu3FNqNuckKQvBpXmSQhKJepOQVaLbR24Z2S1zEOSPhWCRgk1ByHD/JAX3DMyzI8g8c5HWweedudVSDG2QJ6P4GuiCyGtYQDO1r6+eeCq6nBINf4CuR2ujYN7RG6nCxSGGjhT8XzgwBEloKjLgexWh2jg+Z6F3r4IKYYCUOEOceFPa+NA+ecUH0BU4SDmGK2o+2sWeycWcNaxxAQ5JufU9VbmN7xGMptnIaEm3n/wxPq3Id00xPUwSX43ystHsf+RHYWqb2IBZeWjzFhOI8qmcUg2fOA7uMr0IqQazZDXxfmAyCsDaP57DjeqxrE53HV5gNsEYUgxmkFhDBNuIN08wvea9xXdR4ttEf3VxJwTD/w0zG3iWyPCyeo+4Qby7nHe8L2SYbQ7XSiW7E4Xvlt8f/2zVM0IZ+8iKPQISVoUboADPuLHfrSKMPPe3kTklZV0yu1ESPgDIVm3DM+Ezn8DpOj8yXk+NTywoYTAEvhVcBENkG7DJ1IXGXoL7qYH8dkLPUzsoQdRabBwvrmm0Wnce6nNC7hIBsjsk/bHJU3vFIZd7GFNv/DvevBW39SaMQ8mFzDmZi9KUtjARTJAFiA+eN6+vjIRxITNsYSqu8P4dHodD7hIBsgKy5U2XDPv2dcJ9Cu5JoHgIhkgWwE2kZwXBJ/W4G6LCv3qeG/A66/5aYBrq/AGxbO/yWpGOOMG3xIDM/YlVgOhbOlzzls/d8N5ivuanwamOQysz/8uhGQ9wtEShOPlCMlaEQzoA5dCpOe79y0mhNibCDLaHR9fR/jyV9Y3AYJSyE8D2hH2Is40WBBULQhfVK4F94wjRQjxVVtjQF3P3katM3YMjyvhhv9fhH6uwTd/aPWxjeoDu5DdahxGiZwffoe8ECuaRtDlQtR0WjHyfNPmGBCylSAmwmOKWOGfiy3G8qaRNWMcThcWmB/izuyGwBogISsb4jTApNPUPGaWtmJUSiWGHivCsJgi5jirtBX/mZ5nHfd4bhFTbw9hSEAM5HYgnPwdJYevYWO/BQMlY+84Sj65gfDVb8t9328D5P9oohbhyI3VNIj4uoyZZbE1Mb2Akd9o3Cn3aQkzaRszcO7e8r7l2M9ec3l/1m20L7IvbL7KvriE72RWea+d2NLl/RNZQwTrM00FXzfZp6xCy+S8KDN/ILuau3vJCxHiNFrhBk4UPAFSSg0y2sZ1413xGjT5URPG3nEmJXkmy8awHPz+KfBZ8usvg5QqACnlZHsA6f3Si7XYOzYpGLxn7F+MvlDLA065QEZr4PC1CPBbhwqjQEbr+NJqj6ISszVtWNv1kDE0M+9gghyTc6qyNtydXCFktW4EObUXRFc0/T7I6G6hWwbfgxoAGSWHgIrUh5w+AVLKKhq4lH4MUip1Y3m+UR29/ALI6PMgoxf8AHcwNSant/ADYHTha0yxLRedL+lSA9Krm/hlhk+Hrr4FUtokALwV5PR+CE6hhClCKTW8Pl2oMaZ25JoQCHp9WPAMyCglyKihlVAy57a1LQg6/QeJ2JhT+6JnrAAAAABJRU5ErkJggg==",
    c : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFXElEQVR4nO2ZfUwTZxzHz5ltyZIt25Jlf+yf/YHpoZI4etcXJAKC0BYprzdaSsHJ65huE5OZbEai2ZzJYpS7qhScEXUZa6WtHaswWnAzmeB0EDcWdVZI3PBlE0StYKn9LU83Xyj2ri8H9A++yS95crm75/N97vf7PU9yGDaveUWfslT21zPV1h9UlY4Hqiq7R6G2OGSU4TUs2kVRsFD2tllXWGn3FL93Ap4MVWWnR15oPryYMjyHRaMUqtb1BWs7XP7g/lFQ1j4uo8ybsGhROtUqyym1DXOB+0dOie1mep45Zw7BDTGrNdYzmhDBnwxNTTcotW0XM/KNS2YNXKaxvbRabW1VV9u94YL7R1F1lzez6FhnUrb55RlEhwUKlWUbVfm9my/wYr8orOiczCyy6Ovq4Ble0Vflm0rz3mkf4wLYvOMMmG1D8PvFUfjrmgsm7nt8gcbomsk25LuH6z35a9vvygpaayIGT1NbE7NLvnOyTaZddwLo/QNw9fo9CFbD11y+Z7Tr2I3klh6/Jis0pocMTlHtr2ZprD2oyNgmqK3rhUuDYxCu/rg8Bhu29HAWOmJRKi0vBm0gp8Q2xPWZt+3sg7HbbohUd+66YXt9P+tcCrUVRKu+Oh+0gaKaLtYXfra7HyY9XuBLkx4vfLqrb3oKrWkHqawFpHIjSGUGCNoAG/yHW3rg9p3IV/5pX6K2rtc3h6rKASuyDCCRGf6D9xkwRm4AFV0kOc+lC84xSMs3gTjjm8fgfBpAnYNLqC6M1svwyednoGzDSV+gsfHbQdYvN3D+JlTUdk0H58sAWn3U/tjU+8sNKN94MmD6VWw8Caf7bkx55vrf92DrF6chQREAnC8DaAPigufq6w8XApkYn/DA/iMDkJxtYgfnywDaYdnShm3l/fu6QnUMlMVtwYHzZQAdBQIJ5Xww8KifizP+b4uhhixCA2xHhY+3s59v8tZ0PO7n4YYsQgMoZwOpvPbp6aOq6prez+fMwDiLAb/8R3kuL7TA0uUNsGzFAX4MyGcwhVCff3ifUtsG8UlNgJPMo4gV6+CtlIMglRvmzsDAhcBFfLRtEKiyDkjIODQF3D+WSPaBMPXw3BgwsbTR0VsTIFrZyAr/ZIhWfgllH9hn1wDXRtbhuASxIm74xWId2E84wesFcPx4BQrWHp8dA8EcJZAJIlkfEJ5M0UNnt3PKM5OTD8Bic4JcZZ1ZAyh27u0HLt0cuQf1DT2Qp22B+KQGECbpfWNa3wMjo+MBn7t95z7sOXAOEjKP8m9AXe2AZGULLJHooP/XqzBTOts/DIsleyA+5ZCv70duoKYbMigTxEn3PUqDVGWzb5X51uitcUjPfdzFlkobgEg7Ep6Bone7Iau4DZatmNrPH4a2ygRud+CNLVS53R7QVLQ+da645U0gSm8BSSgGyNSDZq5uUlR+FP7h4UuM3hqH0mozR/fSQVxiU1fQBoRC/bMCkt4qIGkX24vTspuh79zViHI+VdnMCo8YEEtMTP3zWKhaJNn3Bk7SepygPYEmQL3//U02cA6OBA1+aXAE1n9k41h12osTjEEg3vUmFqlwIROPk3Q3V1rlFreArrEXTv18xWfI5XL7Ao3RNaaxF3I0X3NudgKCOYWTjBTjW7EEnSYg6N+CPTKEGgKCuSgQMRQ2k0L1gRNMJU4yN/gDp0dwktkUVp6Hq7jEva8ICHoHTjITYYOTtBvVWMyy+rn7ARgr3r0IFZuv6EKCZzpjSd3s/ZnhEi6qlwgI+qcgVv0sTtQnYdEpWICKECeYwWnwBP0nqh2MMizEol1Cof4FAUlvxknaiQKN0bW55prXvLDp+hfbmoxip87ScgAAAABJRU5ErkJggg==",
    python:
      "data:image/png;base64,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",
    typescript:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD00lEQVR4nO2Z22sUVxzH8w/sdWZWimBrS6G0BV+q+KwvlRI2uzOztySbzXpBbR988MlCS9DauNnZy2ySzeZi4nUT8cErihDigxAUa0BTaa2k1cSIpjZa0ybZXL7lnEkDk91GU0xmhfOFL/tyWM5nz+/8LmdLSpiYmJiKUqbwqS9MoeyQOZSFOXQS5qoT1JbgcViCx2CpPApL5RFYiSs6YK1oh7X8MGzlbZoDrbAFWmD3N8Puz8Dua6LmfGlw3kZw3gZwnnrw1CnwsgpeTkKQEprFOAQxBoeoDPJldVuWDhDqHDSFOlEEABDcdQ+XDlDdhWIBcLijYABmdgJNLISWJHaJAywLgaVREytkLawSO1grEcpv5sz+DMzeRpi9DbAQe+o1yylYZVWzlKS2iQnYxDhs7hj91Jq5BnByAnZ3FFxZRLMrAk6Mak3ccjdzZl8a/0cEgmzeIcXx9eFu/PjbU0zkpjH6chw3fx7CgWM9eN9P2meleAFWyXF03xr4zzVDIy/w2Y6GOYiiA1DwTcfVV67r7X8AvvTgMgL4M1gTbsOacCveJa5uwYfb23Sb+KA6g/eqmrA2mMbaYCM1Abg98GR+zeNnL1G67wQ27+1AT592Kpev38PHwSR4V2Q5K7E2jVkqO2AlrmiHo1x/KpxHhS0wN435SSudpiH0fGxifk3zhZvgxBidxN6Rogjs7wJfVks3vuIT2UIAu6zmFTKShQYej+rifcPuZnBuBTzJUCQLGTVSLgSwycl8AFlF5sIPunVT0zPIdt/G+p0ZcK467dcvBgBaAxa2Et40Pgqn8ej3P/Mu7vTMLLp67mBdODUX/8UIQF4lPPX4dFsTrvU/KJiB/p7IwVeTBe+MGAcwO7sIAKnEnnpwooLt0bMYGP4jDyI3NYNNe1ohuKPGAJBwWBxAexPipCRWiQp2xc/j/tAzHcS5a3fBO2uNASAXszBAGnaPitW+BOyiAo48aBFLCZpG+34Znv+OkdEx8KXfGQOQKwRAXuOkBL5KXcLT53+h5uhV2sxpL3IqOFcUp3ruzH/H2Pgk+NIDxgBMTk3rAUgKdcdw6cZ9XZi0X76FzXuPYOOXLfi2vZs2dv+q794weOdBYwDIRvJOwJOCtP80ZsgNfw3tUc9DcEWMARjPTRW8AzZJRbD2DE2Vi+n4lT4Izu8hkM0bAjBZGIDao+KTrWnET/ei/9cn9MITPRp5gYu9P8FX06n1Q+7YytYBi7dRP5HJqUXTqF03kR0C5zxEpzI6B7yRVuLt/4Mju8VU1TloNIAgKg8Fl/L5kgGYmJiYSlZC/wBsbaUMdQ+U/AAAAABJRU5ErkJggg==",
    go: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADdElEQVRoge3XXWgcVRTA8d+soRTRIlKCqAQNRTJRW5WqWFRQK7SKXzgW1CJWH0oRHwQ/EIQWBKU+WKsFRSyCKJLsqAi1hVpFSw0+FNEYd1RKDSXkqQ+hD6GEsvHhbpLN7GSzSfs4f1iYuefec885c885dykpKSkpKSkpKSkpWSbRBdOU1rqINuJx3IYedGEcQ9hvZOCYXbva6agQrce9uBHdDckYfsbXkvjMhXUg/QuVTdiDvkVmD2K7JJ6YryOr4Fm8jjVt1k9gJ9P7JP11zteBwVpFJXobL6PS4arfcM9sJNPscgxg41J2ZvppSf+5Tjdt5bM/qER78arOjYdb8AFIs8vwg6UZD1uI9pD/AtVshchW4ewuxElJfESaPYf9BfJJHMAJ9OJhXJybU8f12N2Q5zmNw0L+XIdNWFGg49b5hkZ6sdr8iOaff5VmVwhnPs9hbJPE47MjadaDQ7gaR/E9fsT6AuPPYSfelcRnm3T04ztck7Nle9TYoLfAmCJOSeKT0my3cHSaOcL0Zkn/uZZVae0S0856oiGr1iqi6B+tCbtDEn9UuHOabcAvudF/u/C8EJ16TlgveP5CtTaKpwrmvjBrfJr14RXNXy9Cms28rSow/rh6/eNC46E+NaSyYgQ3NI32LFyFqrVu+VyIonHhM/6Xmz0sidfNvqXZN3h0Qd3FvCSJ32s7I80OCfkwQ704WdNsDT4VIjgTxTruExpUnlNNa/sUJ+Zi/N1W+v5B5ucAnC52IIlP4K5CWZrljxpzHRMSIRmb6bJ4qb2yvfTatUJFaub35fSBsYKx9Y3IU59+i+jSuZ+rMNqB3m0Ga8X2pNlKfKg1CF8t3YG6U1qdqGBAmvXY0l+X9E1J+qaY7sa3WqvcUIHmO1WivdJsfr1Ps16h9G7IzR/D58u7SqTZm3ijQDKJgw3lPULC5ZvYONYJHXhtgY5RoRFOCBXnAcVN7BFJfGC5DqzCn4oTuh2TuF8SD0mzuwUn2nX9hXhNEr/D0u4wc4SL2ENCy++UCTwoiYcaOo5ih9b+044pvDhjPMt1IBgwjNuF68FiHMDNkvinnI5PsFlnSX4Ud0jifc2D5/9/oDpSEV20EU8K95vVQqRGhWT90uTUsGfWLawjra0kSvAYbhLK8pmGjmOoOjt13NY2OkpKSkpKSkpKSkpKlsr/x7Ht9ELNC5IAAAAASUVORK5CYII=",
    php: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAADKUlEQVR4nO1VWU8TURgdf4maaPRBo77og9Fo4voARoM+EHfESEDC0nWGNhiCCO10hoJBFCidzgxtkApxIVJEIDptKNCFioTUGDVCIEWMDIWEhs/cVmpLsEAffOpJvuTOd893ztwdw1JIIYX/AcBgS5XEsF9TbMincZ6pJnivDuemdQpW1EiNIRSojXKoD3GqJMa7pJzZl5Shtsiwmya4RlLJzurVZtHyuHexq80N9u5P4HFMwqhrBsZHfoYDtVEO9dna3GCp713Uq81zqJbCuYZKqWnXuoaaYmY7RfA9NMEFOxh7CAn6P/xKKtz2CehghBBFcEG6hHtTITdsW9NUp2DvUDgnvmpxhtBIEokWSiqg2dC5oR9AWkiTUnKiVsHdjjMl5WxxjdoibnSE6Zey4X2ff1Mz4HFMQo3aMk8RXNGf9TQeoHEu6BucjiNm3iiEg8fSwnH4xAW4kiWBN10j4HFOwqHj6dG+o2cugvpebcKaFU2fcxqQF9qwWDXO99ms3uXV03PkdAaMDE2Fvz96ZqCx4TlkZObCs6cCXMuWR7mDwpcwN1FNrHa31bOsJ1p6MY2MWfQ5I+SV6OsZg7SMrLjckOMbnEy7DFqSgbLy+mi+q9MTFk9UE5vzDUyBVm5awEiZaWG1scn4GvIKysLtMe8PEPr9UCR9AIRaDzn5pcCztii3rs4KUoUmYc2axjTR0ouGH9tZfv9J3FqdPX8dVKU1MOoKwKlzV8Hx7nOUK8NJqH3YmrAmVttmdS/TJfxbDC00hbPB2FHfyiGg1dK/qV27kRrfwBQgr+jNppGzhXqVRUSHHhHQujiFr5syXq/GJUyAXmWZp3C+IP4sK9lsdMhf8gOhce/spkwTXiDeWXjBDYR0SlakcNPNf1yZ7FYK57rRWWs32pfcQmQGkgmX8B3am4UlpEXjvA1pr3tnV0qbdlIEX08p2Rm9yixaHvUsRB4Jf+SRGA78fSSGA+GcYPMD4iAuqtHhbIAiuDpSwexY13AtkPKmvRpZcx6l5JqrVWYXpeSnSIVpTitjllCgNspVl7S4aCVvqJIwuZpiZk9SZimkkAKWBH4DhjzdpFIFBdEAAAAASUVORK5CYII=",
    ruby: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEyklEQVR4nO2YTWzbZBzGc+DEYbbbLnXzobRpEqfrlLIuX86HknRtmnZtlvSCuHCEC9JuXNluHBFISI1hCDiwDo2KVahUZYxBk5Uytkl0IDRVoyxpRz/WspG1a5f90es1mePaTuwELUL5S88lF/+e18/75vGrUtWnPvWpz/92Mq6jvgztmL7XE5zLjcT+gpERENOTeBwWaDqbpKjZJEWdTpnN2ucOnqEdkNcy7dzIRiK/CcE/ikbhlyNHIGW1FpSkqGyKol5/7uB8Lfu9sBONFuDvRyJw9fDhIvgiI1brazUBXiSPCzb7w3A3FIIrHR2i8HsGHs51dur/O3jacapscI7SXjf8MzgIt1yukiZSVutbNQWPtBIKFmK0NTQEt71emBUzQlGpmoJHenj8+L7NvHviBKQDgX17IklR6zUFj+IjdaTm4nFYOXYMrnd15U1s1ww8Pz4gpXgc7oXDcLO7e7dm4MXiA/y3EIvBZn8/LHq9cNVme1Iz8FLx2RoaYo/W351O+PHQocIeuGg0VvYG7niODlYDnh+fHGeVOXnfpymD4YFieAgEXki77fPVMrARDsNyMAi/2u0wy1llKV1oaUkrNpCh7SerBb/aE5Jc6ZSAfjCbYZwkbyiCX/T5iAxtX6sUfMnjhI2+XjY2i36/LAPftLbCeZK8pMhAmra/W/nKu+DBwEAh96g+lAufpCj4WqdDBsZkwy+5XB0Z2rFTKXxW4Mj82WYry8DFtjaY1Ong8+bmd5Ss/mSlx+Wj4WHB4/K2x1MSfsZiYeGRzh08+KZsA5s9wZTizPs98DgWEz3v/45ESmffYHhmoKnpZdkGcvH4+rLHtSIXHn2woPO9VEX4SeIj5rLZXIBHOkuSDtkGnrbD6Jwc+LvBAAtXTs9ZoGnxjavXFxlgdLoGRQaQ0IpKgvvcsBoKwnpvL9zo6mLrMKrFpQygP7SUgIHp1tYi+K90OpANzzWAYDIepyA0t5T9yTnf0T8s6jOoJkjdQszx/om/a28vgkea0GqV9SD+auWht0SaJFp9oRVFvy8Fg7ArsC9uud3Pcm8ywSQvOnsGshUbQA1RqgKjs77UqYI+F/lvZb2v72ldsFj25T6vL0lyrSID9wcG2Iff8ftFDXDjU46u2WzsXtkeHoYrVqsoPNJ4c/Mfig2gC6f89ymKgpgBsfiU0mWLBcY1GlF41oDSIoc22Xx3d9EDhWJUTnwEa0J7O5xpaAAGx+GsWi1qQHGRW6DpHP+hQjFCv8mFn2prgw8JgoXPS8yEoiKHJkVRG/wHoy7PNyC330/o9fABD56RMKGoyKFBt8RCANwYyYnP92YzfKZWC4IzEiYUFbk9A6eFQLgxKvf0mTIa4aPGxpLwjIAJRUUOzQxFadgrbokYlYrPJZMJxkiybHBGwISiIpcfdD8vFiOp+KC4nNdoRLNersbUavhYo2lUVTLofp7/JlCMhOIzbTTCOZIUBU9g2BaDYUsJDLuZwLAZBsMmEhj2CYPjb4/i+MkEjr/K4PjwKEH4EgTR+T6GEapqDIoTuuJGt8RJq3X1us32+JrNtv2tybQzaTCsfaHVzn/a1HQhgWHvMRh2isHxNxIE8Qpz4EBfAsNeOkMQ+tGWlherAlOf+tSnPqpamn8BvPy5ZOiJW2sAAAAASUVORK5CYII=",
    rust: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEW0lEQVR4nKVWXWxURRT+atLUPx400QT8QUtt98xui3W5s4APPKBGrREwae9daPRBfjT6oC8kasIao+lMGx/gSaMGjQVLq0YDRKLRmJJQkY0PWNn+7Mz2R22sCCqx+Fdrzr2zuC2lLTjJyc3MnDnfPed858wACxiNazJXNybVzQ+u1ov8lN7K342r2pbyOv7vCKRqCFa0NAee6g48/Vfg6UIg9VT4DeeqO9yXquGijTfJluW+bFkXeGoiNCr1lO/pA8/Q0yePXHFn7rmap07yvLjHeqF+qrVugRBTZYHU46FhqSebUioIvNYNvGMg3rcQAwb0Ueip17qB91nPAY7z+TnN+57aGEj1tTvQkk4qyesWNTUG9KyF+NhC/GggPuN5AXHifdZj/ehceD49B4juCjx9xpd6Z+PKl68dQO2NBmKfgfjHQExaiH4DccR9J3ndgt5lPdb3pdoVnvd01+wAUh+NQqSO8bwAus+AThmIswaxDguxxUI0FsUgvtlCvFGA+MWAxvKIJd2PZh05es7Lgy81J/Nw86q266P4U85CTM0vNGJA3zEQe8TnmXVsb1p+fE/tZfSXlj3+qYH4IA9am0P9kgLE7cOorWQZQqLBQDwZSaJ5GPFlBdB6Cxo0oJ8t6IwBfW5B+1+oeuITl5/2cyCBp0/4nh41EActxGjxLzlUQ4gtdp79VOqBAb3K63kkVjjdfe5byCP+YSDViC91LgTYlHxxcSB1P3P9aIW31oC+sVGi34oOJULuR7mh3Rx7A3rTQExMAWUWsYdZbxDUZEMy0IlsRfIeV2P9wWq9BGlPb3Y1scMZe8dA9OURf2gWkDELkTWg02zMgtZZ0J8WojuLZDnXkAXtcUTawXbZPprr2q4KPPVrkVVcCwaiZyaIhchYiE4nrxeQiFmIbS5EOg+630CcNhC9EYg6xnbZPk8ene4JvWdB4wb0/HRP6BX2wsnbw6i9JgKnLpcvLtSzFvTaeZ5EOVF9HMMHkpkriwksyhCqb3XGfpiR+N0ReOxuV6jsURuvsZ1iTtj+NHY9siZzeQ41iwzEJgO6awixO4oMtIgvN6DmEpCxKeAy3mOKW1CKicDze6t2VjC72O5/FJaq3fG6g+eDiN/EybcQvSUhyhqIr1wBfumAcm6vl7tDPyjl7HW4/rfnghU/gKrr8hCnDGjCgA6VJLzTgvYaxKoLoMciJtIhp/fbt4hVX7DiXch63L2RjXpXLG1Bv1sIlswIbruhVD9qnkyO+B+sx/qlvcv31BezNslAqs6oC6tdfWW1B7geLGi02IUNhGV6c1W7OcuoBeX7yxL75+3CEYhOF++Ttsot7cfL6w8bCFlAzS0WtJ27QBQe7ga03YKWFhBbeby8vru1cmuYV1/q3jnvk/luxpnjkm7Gc4dTrXWz3fG+1N8HUmUCqcZm3vFpqddfxB1fAuZeK8y60teK76mhwFN/h+uX+lqZObj/FN9daam2Fd9dYV9awPgXr93p2ac1LdIAAAAASUVORK5CYII=",
  };

  const fetchAllRooms = () => {
    axios
      .get("http://localhost:3000/api/rooms", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProjects(res.data?.rooms || []);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed to load rooms");
      });
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  const handleCreateProject = async () => {
    if (!language || !title) {
      toast.error("Please fill in both title and language.");
      return;
    }
    const icon = icons[language.toLowerCase()];
    if (!icon) {
      toast.error("Invalid language selected.");
      return;
    }
    console.log(icon);



    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/rooms",
        { language, title, languageIcon : icon },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchAllRooms();
      toast.success("Project created successfully!");
      setTitle("");
      setLanguage("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 max-sm:p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-full">
      {/* Header Section */}
      <div className="p-6 max-sm:p-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <div className="flex space-x-4">
          {/* Join Project Dialog */}
          <Dialog>
            <DialogTrigger className="border border-purple-500 px-3 py-1 rounded-md text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-600/20 transition">
              Join
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-lg w-[425px]">
              <DialogHeader>
                <DialogTitle>Join Project</DialogTitle>
                <DialogDescription>
                  To join a project, enter the join ID, which can be obtained
                  from your friend.
                </DialogDescription>
                <div className="flex items-center justify-between mt-4">
                  <label htmlFor="project" className="text-sm font-medium">
                    Project ID
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter Project ID"
                    className="bg-gray-100 dark:bg-gray-800 w-[70%] px-3 py-1 rounded-md border-none ring-0 focus-visible:ring-0"
                  />
                </div>
                <div className="flex justify-end mt-8">
                  <Button
                    variant="secondary"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white transition"
                  >
                    Join Project
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* New Project Dialog */}
          <Dialog>
            <DialogTrigger className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600 transition">
              New Project +
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-lg w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Start coding with your friends by creating a new project and
                  start debugging with AI.
                </DialogDescription>

                <div className="flex items-center justify-between gap-2 mt-4">
                  <label htmlFor="project" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    type="text"
                    placeholder="Project Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-100 dark:bg-gray-800 w-[70%] px-3 py-1 rounded-md border-none ring-0 focus-visible:ring-0"
                  />
                </div>

                <div className="flex items-center justify-between gap-2 mt-4">
                  <label className="text-sm font-medium">Language</label>
                  <Select
                    onValueChange={(val) => setLanguage(val)}
                    value={language}
                  >
                    <SelectTrigger className="w-[70%] bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-none">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="c">C</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                      <SelectItem value="ruby">Ruby</SelectItem>
                      <SelectItem value="rust">Rust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end mt-8">
                  <Button
                    variant="secondary"
                    onClick={handleCreateProject}
                    className="bg-green-500 hover:bg-green-600 text-white transition"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Project +"}
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Display Created Projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg"
          >
            {/* Delete Icon */}
            <div className=" text-red-500 cursor-pointer ">
              <MdDeleteOutline size={25} />
            </div>

            {/* Language Badge */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {proj?.title}
              </h3>
              <img
                src={proj?.languageIcon}
                alt="Language Icon"
                className="w-8 h-8"
              />
            </div>

            {/* Members */}
            <p className="text-sm font-medium mb-2">Members:</p>
            <div className="flex -space-x-2 mb-4">
              {proj.participants?.map((user) => (
                <img
                  key={user._id}
                  src={user.avatar}
                  alt={user.username}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                />
              ))}
              
            </div>

            {/* Creation Date & Creator */}
            <p className="text-xs text-gray-500">
              <span className="text-gray-900 dark:text-gray-400">Created at</span> {new Date(proj.createdAt).toDateString()}
            </p>
            <div className="flex justify-between items-center gap-2 text-xs ">
              <div className="flex items-center gap-2">
              <span className="text-lg">By</span>
              {proj.roomCreatedby?.avatar && (
                <img
                  src={proj.roomCreatedby.avatar}
                  alt="creator-avatar"
                  className="w-5 h-5 rounded-full"
                />
              )}
              </div>
              
               <div className="flex justify-end ">
              <button className="px-4 py-2 border border-blue-500 dark:text-white  text-sm rounded hover:bg-blue-500  hover:shadow-md hover:shadow-blue-700 transition">
                Open
              </button>
            </div>
            </div>

            {/* Open Button */}
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
