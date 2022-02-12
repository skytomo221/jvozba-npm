# `sozysozbot_jvozba`との違い

|               Before                |               After               |
| :---------------------------------: | :-------------------------------: |
|         `jvokaha/jvokaha2`          |      `jvokaha/sloppyJvokaha`      |
|          `jvokaha_gui/.*`           |              Removed              |
|         `jvozba/is_cmevla`          |         `tools/isCmevla`          |
|         `jvozba/normalize`          |      `bondRafsis/bondRafsis`      |
|        `jvozba/is_tosmabru`         |        `tosmabru/tosmabru`        |
|           `jvozba/is_CVV`           |              Removed              |
|           `jvozba/is_CCV`           |              Removed              |
|           `jvozba/is_CVC`           |              Removed              |
|         `jvozba/is_4letter`         |              Removed              |
|           `jvozba_gui/.*`           |              Removed              |
|           `rafsi_list.ts`           |           `rafsi.json`            |
|      `scoring/get_lujvo_score`      |        `tools/lujvoScore`         |
|        `scoring/get_CV_info`        |         `tools/syllables`         |
|           `scoring/is_C`            |        `tools/isConsonant`        |
|  `tools/create_every_possibility`   |  `tools/possibilityCombinations`  |
|      `tools/gismu_rafsi_list$`      |              Removed              |
|      `tools/cmavo_rafsi_list$`      |              Removed              |
|         `tools/get_candid`          | `rafsiCandidates/rafsiCandidates` |
| `tools/search_selrafsi_from_rafsi2` |              Removed              |
| `tools/search_selrafsi_from_rafsi`  |        `selrafsi/selrafsi`        |

## `bondRafsis`の挙動の変更

```diff
describe('avoidProhibitions test', () => {
  ...
  test('nunynau to be nunynau', () => {
-   expect(normalize(['nun', 'y', 'nau'])).toEqual(['nun', 'y', 'y', 'nau']);
+   expect(bondRafsis(['nun', 'y', 'nau'])).toEqual(['nun', 'y', 'nau']);
  });
  ...
});
```

## `jvokaha`の挙動の変更

```diff
describe('jvokaha test', () => {
  ...
  test('nunynau to be nunynau', () => {
    expect(jvokaha("fu'ivla")).toEqual(["fu'i", 'vla']);
+   expect(jvokaha("fu'ivla", false)).toEqual(["fu'i", 'vla']);
+   expect(jvokaha("fu'ivla", true)).toEqual(['fukpi', 'valsi']);
  });
  ...
});
```
